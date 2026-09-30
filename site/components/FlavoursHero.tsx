"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Heading from "./Heading";
import { categories, menuPage, hero } from "../content";

/** Flavours page header: a pink band with the title, three floating toppings and the category chips. */
export default function FlavoursHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".fh-in", { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.15 });
      gsap.from(".fh-top", { scale: 0.4, opacity: 0, rotate: -30, duration: 1.1, ease: "back.out(1.6)", stagger: 0.1, delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, []);

  const tops = hero.toppings;

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-[clamp(130px,15vw,210px)] pb-[clamp(60px,7vw,110px)]">
      <div aria-hidden className="blob absolute top-[-18%] right-[-10%] h-[60vmin] w-[60vmin] bg-[#ffd6e2]" />
      <div aria-hidden className="blob absolute bottom-[-30%] left-[-12%] h-[45vmin] w-[45vmin] bg-[var(--pistachio)] opacity-50" />
      {[
        { t: tops[0], c: "left-[3%] top-[26%] w-[clamp(54px,8vw,130px)] rotate-[-12deg]" },
        { t: tops[1], c: "right-[6%] top-[22%] w-[clamp(46px,6vw,100px)] rotate-[10deg]" },
        { t: tops[2], c: "right-[10%] bottom-[16%] w-[clamp(50px,7vw,120px)] rotate-[18deg]" },
        { t: tops[3], c: "left-[10%] bottom-[12%] w-[clamp(40px,5vw,90px)] rotate-[-20deg]" },
      ].map((x, i) => (
        <span key={i} aria-hidden className={`fh-top drift pointer-events-none absolute ${x.c}`} style={{ animationDelay: `${i * -1.3}s` }}>
          <img src={x.t.src} alt="" className="w-full drop-shadow-[0_14px_14px_rgba(60,10,30,.2)]" />
        </span>
      ))}

      <div className="container-x relative text-center">
        <p className="eyebrow fh-in">{menuPage.eyebrow}</p>
        <Heading as="h1" lines={menuPage.heading} className="fh-in mx-auto mt-5 text-[clamp(52px,8vw,132px)]" />
        <p className="fh-in mx-auto mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted">{menuPage.text}</p>

        <ul className="fh-in mx-auto mt-9 flex max-w-[1000px] flex-wrap justify-center gap-2.5">
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-extrabold shadow-[0_5px_0_#f0c3d1] transition-all hover:translate-y-[3px] hover:bg-accent hover:text-white hover:shadow-[0_2px_0_#f0c3d1] md:text-[15px]">
                <span className="h-3 w-3 rounded-full" style={{ background: c.fill }} />
                {c.name}
                <span className="tnum text-[12px] font-bold opacity-60">{c.products.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
