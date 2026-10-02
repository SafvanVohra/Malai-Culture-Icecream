import type { SiteMeta, Theme } from "@/lib/site";

// Settings for THIS site: Melt Theory, a (concept) handcrafted ice-cream brand from Hyderabad. Direction: site/DESIGN.md.

export const meta: SiteMeta = {
  name: "Cream Crust",
  title: "Cream Crust — Premium Ice Cream",
  description: "Handcrafted, small-batch ice cream. Pistachio malai, Alphonso mango, Belgian cocoa and more, in scoops, sundaes and family tubs.",
  loaderText: "CREAM CRUST",
  loader: false, // site/components/ScoopLoader.tsx replaces the engine loader
  // ?record=1 uses the section timeline (data-record-* attributes on the sections, docs/RECORDING.md): 37 s + the 2.5 s loader.
  // duration is only the fallback for constant-speed mode.
  record: { duration: 37 },
};

export const theme: Theme = {
  bg: "#faf5ff",
  surface: "#ffffff",
  text: "#220c30",
  muted: "#665070",
  accent: "#52188a",
  accentText: "#ffffff",
  line: "#ecd7f7",
  fontDisplay: "'Fredoka Variable', 'Fredoka', system-ui, sans-serif",
  fontBody: "'Nunito Variable', 'Nunito', system-ui, sans-serif",
  radius: 999,
  uppercaseHeadings: false,
  heroText: "#220c30",
};
