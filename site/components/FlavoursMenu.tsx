"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import DripEdge from "./DripEdge";
import Heading from "./Heading";
import Photo from "./Photo";
import { addToOrder } from "./ScoopNav";
import { categories, menuPage, type Category } from "../content";

// the band colour each category drips its own colour into the next one
const INK = "#2b1233";

function Card({ p, fill }: { p: Category["products"][number]; fill: string }) {
  const [added, setAdded] = useState(false);
  return (
    <article className="capsule group relative flex flex-col pt-[9%] transition-transform duration-500 hover:-translate-y-2" style={{ background: fill, color: INK }} data-cursor="Add">
      {p.image && (
        <div className="relative mx-auto w-[64%]">
          <img src={p.image} alt={`${p.name}`} width={1000} height={1000} loading="lazy" className="aspect-square w-full object-contain object-bottom drop-shadow-[0_22px_18px_rgba(40,8,60,.2)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:-rotate-6" />
        </div>
      )}
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4 md:px-7 md:pt-5 md:pb-7">
        {p.tag && <span className="tag self-start">{p.tag}</span>}
        <h3 className="font-display mt-3 text-[clamp(21px,2.1vw,32px)]">{p.name}</h3>
        <p className="mt-2 hidden text-[15px] leading-snug opacity-85 md:block">{p.note}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 md:pt-6">
          <span className="rounded-full bg-white px-3 py-2 text-[14px] font-extrabold md:px-4 md:text-[16px]">
            <span className="tnum">₹{p.price.toLocaleString("en-IN")}</span> <span className="hidden font-bold text-muted sm:inline">{p.unit}</span>
          </span>
          <button
            aria-label={`Add ${p.name}`}
            onClick={() => {
              addToOrder();
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[22px] leading-none font-bold text-white shadow-[0_4px_0_var(--accent-deep)] transition-all hover:translate-y-[2px] md:h-12 md:w-12 ${added ? "scale-110 bg-[#2f8f4e]" : "bg-accent"}`}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}

/** Every category as its own band: photo bubble + title on the left, capsule cards on the right. A sticky chip bar follows you down. */
export default function FlavoursMenu() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(categories[0].id);
  const chips = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let cur = "";
      categories.forEach((c) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < line) cur = c.id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // keep the active chip visible in the horizontally scrolling bar (phones)
  useEffect(() => {
    chips.current[active]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  // arriving as /flavours#sundaes from the home page
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { immediate: true, offset: -70 });
      else el.scrollIntoView();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cat-photo").forEach((el) => {
        gsap.fromTo(el, { rotate: -6, scale: 0.9 }, { rotate: 4, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative z-[1]">
      {/* sticky category chips */}
      <div className="sticky top-[76px] z-40 md:top-[84px]">
        <div className="container-x">
          <nav aria-label="Categories" className="no-scrollbar mx-auto flex w-max max-w-full gap-1.5 overflow-x-auto rounded-full bg-white/95 p-1.5 shadow-[0_14px_40px_-16px_rgba(60,10,100,.28)]" data-lenis-prevent>
            {categories.map((c) => (
              <a
                key={c.id}
                ref={(el) => {
                  chips.current[c.id] = el;
                }}
                href={`#${c.id}`}
                className={`rounded-full px-4 py-2 text-[13px] font-extrabold whitespace-nowrap transition-colors md:text-[14px] ${active === c.id ? "bg-accent text-white" : "text-fg/75 hover:bg-[var(--strawberry)]"}`}
              >
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {categories.map((c, i) => {
        const prev = i === 0 ? "var(--bg)" : categories[i - 1].fill;
        return (
          <section key={c.id} id={c.id} aria-label={c.name} className="relative scroll-mt-24 pt-[clamp(110px,12vw,180px)] pb-[clamp(70px,8vw,120px)]" style={{ background: `color-mix(in srgb, ${c.fill} 38%, var(--bg))` }}>
            {i > 0 && <DripEdge color={`color-mix(in srgb, ${prev} 38%, var(--bg))`} layout={i} flip={i % 2 === 1} />}
            <div className="container-x grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
              <div className="lg:sticky lg:top-[150px] lg:self-start">
                <div data-reveal className="cat-photo relative mx-auto aspect-square w-[min(260px,60vw)] overflow-hidden rounded-full p-1.5 ring-[3px] ring-white lg:mx-0 lg:w-[min(320px,100%)]" style={{ background: c.fill }}>
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <Photo photo={c.photo} tone={c.fill} alt={c.name} />
                  </div>
                </div>
                <p className="eyebrow mt-8">{String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}</p>
                <Heading lines={[c.name.split(" ").length > 1 ? c.name.replace(/ (\S+)$/, " *$1*") : `*${c.name}*`]} className="mt-4 text-[clamp(44px,5.4vw,88px)]" />
                <p className="mt-4 max-w-[360px] text-[16px] leading-relaxed text-muted">{c.blurb}</p>
              </div>

              <div data-reveal="stagger" className="grid grid-cols-2 gap-x-3 gap-y-5 xl:grid-cols-3 lg:gap-6">
                {c.products.map((p) => (
                  <Card key={p.name} p={p} fill={c.fill} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* closing call to action */}
      <section className="relative overflow-hidden bg-accent pt-[clamp(110px,12vw,180px)] pb-[clamp(70px,8vw,120px)] text-center text-[#fff1f4]">
        <DripEdge color={`color-mix(in srgb, ${categories[categories.length - 1].fill} 38%, var(--bg))`} layout={0} />
        <div className="container-x">
          <h2 data-reveal className="font-display text-[clamp(40px,6vw,96px)]">{menuPage.cta.title}</h2>
          <p data-reveal className="mx-auto mt-4 max-w-[420px] text-[17px] opacity-90">{menuPage.cta.text}</p>
          <a data-reveal href={menuPage.cta.href} className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-[16px] font-extrabold text-accent shadow-[0_5px_0_rgba(0,0,0,.18)] transition-transform hover:translate-y-[3px]">
            {menuPage.cta.label}
          </a>
        </div>
      </section>
    </div>
  );
}
