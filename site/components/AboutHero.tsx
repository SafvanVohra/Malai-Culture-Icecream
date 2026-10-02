"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Heading from "./Heading";
import { aboutPage, hero } from "../content";

export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".ah-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".ah-top", {
        scale: 0.4,
        opacity: 0,
        rotate: -25,
        duration: 1.1,
        ease: "back.out(1.6)",
        stagger: 0.1,
        delay: 0.3,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const tops = hero.toppings;

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-[clamp(130px,15vw,210px)] pb-[clamp(60px,8vw,120px)]">
      {/* Background soft blobs */}
      <div aria-hidden className="blob absolute top-[-15%] right-[-8%] h-[65vmin] w-[65vmin] bg-[#f0dcfe] opacity-75" />
      <div aria-hidden className="blob absolute bottom-[-25%] left-[-10%] h-[50vmin] w-[50vmin] bg-[var(--pistachio)] opacity-40" />

      {/* Drifting toppings around the hero */}
      {[
        { t: tops[0], c: "left-[3%] top-[24%] w-[clamp(55px,8vw,130px)] rotate-[-12deg]" },
        { t: tops[1], c: "right-[5%] top-[20%] w-[clamp(48px,6.5vw,110px)] rotate-[12deg]" },
        { t: tops[2], c: "right-[8%] bottom-[12%] w-[clamp(52px,7vw,125px)] rotate-[18deg]" },
        { t: tops[3], c: "left-[8%] bottom-[10%] w-[clamp(44px,5.5vw,100px)] rotate-[-20deg]" },
      ].map((x, i) => (
        <span key={i} aria-hidden className={`ah-top drift pointer-events-none absolute ${x.c}`} style={{ animationDelay: `${i * -1.4}s` }}>
          <img src={x.t.src} alt="" className="w-full drop-shadow-[0_14px_14px_rgba(40,8,60,.18)]" />
        </span>
      ))}

      <div className="container-x relative text-center">
        {/* Eyebrow pill */}
        <p className="eyebrow ah-in inline-flex items-center gap-2">
          <span>{aboutPage.eyebrow}</span>
        </p>

        {/* Big headline */}
        <Heading as="h1" lines={aboutPage.heading} className="ah-in mx-auto mt-5 text-[clamp(48px,7.5vw,118px)] leading-[0.98]" />

        {/* Subtitle text */}
        <p className="ah-in mx-auto mt-6 max-w-[680px] text-[17px] leading-relaxed text-muted md:text-[19px]">
          {aboutPage.subtitle}
        </p>

        {/* Stats Grid */}
        <div className="ah-in mx-auto mt-12 grid max-w-[960px] grid-cols-2 gap-3 sm:grid-cols-4 md:mt-16 md:gap-4">
          {aboutPage.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-[28px] border border-[var(--line)] bg-white/90 p-5 shadow-[var(--soft-shadow)] backdrop-blur-xs transition-transform hover:-translate-y-1 md:p-6"
            >
              <span className="font-display tnum text-[clamp(32px,4vw,52px)] font-bold text-accent">{s.value}</span>
              <span className="mt-1 text-[14px] font-extrabold text-fg">{s.label}</span>
              <span className="mt-1 text-[11px] font-semibold text-muted text-center">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
