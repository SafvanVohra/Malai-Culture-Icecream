import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/images/melt/WhatsApp Image 2026-10-02 at 4.58.57 PM.jpeg");
const outputPath = path.join(__dirname, "../public/images/melt/cream-crust-transparent.png");

async function removeBackground() {
  if (!fs.existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    return;
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get raw RGBA buffer
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height * 2);
  let head = 0;
  let tail = 0;

  // Find the bottom-most point of the central gold crest tip
  let maxGoldY = 0;
  for (let y = Math.round(height * 0.7); y < height; y++) {
    for (let x = Math.round(width * 0.4); x < Math.round(width * 0.6); x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r > 120 && g > 80 && b < 60) {
        if (y > maxGoldY) maxGoldY = y;
      }
    }
  }

  const cutoffY = maxGoldY > 0 ? maxGoldY + 4 : Math.round(height * 0.91);

  // Clear everything below the gold crest bottom
  for (let y = cutoffY; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      data[idx * 4 + 3] = 0;
      visited[idx] = 1;
    }
  }

  // Flood fill criterion: background is dark / black, OR the (R) registered trademark mark in top right
  function isBackground(x, y) {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Gold border check: never cross gold! Gold has high red and green
    if (r > 105 && g > 70 && (r + g) > (b * 2)) {
      return false;
    }

    // Inside the scoop circle at top: never cross red/green/yellow/white scoops
    if (y < height * 0.4 && x > width * 0.35 && x < width * 0.65) {
      if ((r + g + b) > 100) return false;
    }

    // Inside purple crest: has r > 40, b > 65
    // Top right (R) mark is at x > 0.82 * width, y < 0.38 * height. It's purple text on black, treat as background!
    if (x > width * 0.82 && y < height * 0.38) {
      return (r < 70 && g < 40 && b < 130) || (r < 40 && g < 40 && b < 40);
    }

    // Normal black background
    return r < 38 && g < 38 && b < 38;
  }

  // Seed with outer borders
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0) && !visited[x]) {
      visited[x] = 1;
      queue[tail++] = x;
      queue[tail++] = 0;
    }
  }

  for (let y = 0; y < cutoffY; y++) {
    const leftIdx = y * width;
    const rightIdx = y * width + (width - 1);
    if (isBackground(0, y) && !visited[leftIdx]) {
      visited[leftIdx] = 1;
      queue[tail++] = 0;
      queue[tail++] = y;
    }
    if (isBackground(width - 1, y) && !visited[rightIdx]) {
      visited[rightIdx] = 1;
      queue[tail++] = width - 1;
      queue[tail++] = y;
    }
  }

  // BFS
  while (head < tail) {
    const x = queue[head++];
    const y = queue[head++];
    const currentIdx = y * width + x;
    data[currentIdx * 4 + 3] = 0;

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
    ];

    for (let i = 0; i < neighbors.length; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < cutoffY) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBackground(nx, ny)) {
          visited[nIdx] = 1;
          queue[tail++] = nx;
          queue[tail++] = ny;
        }
      }
    }
  }

  // Soft edge / feathering: adjacent pixels that are dark
  for (let y = 1; y < cutoffY; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (!visited[idx]) {
        const hasTransparentNeighbor =
          visited[idx - 1] || visited[idx + 1] || visited[idx - width] || visited[idx + width];
        if (hasTransparentNeighbor) {
          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];
          const maxVal = Math.max(r, g, b);
          if (maxVal < 65) {
            data[idx * 4 + 3] = Math.max(0, Math.round(((maxVal - 15) / 50) * 255));
          }
        }
      }
    }
  }

  // Save the transparent PNG, trimmed of empty outer borders
  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log("Clean transparent logo generated at:", outputPath);
}

removeBackground().catch(console.error);
