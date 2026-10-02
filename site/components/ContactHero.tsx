"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Heading from "./Heading";
import { contactPage, hero } from "../content";

export default function ContactHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".ch-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".ch-top", {
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
    <section ref={root} id="top" className="relative overflow-hidden pt-[clamp(130px,15vw,210px)] pb-[clamp(50px,7vw,100px)]">
      {/* Background soft blobs */}
      <div aria-hidden className="blob absolute top-[-16%] right-[-8%] h-[65vmin] w-[65vmin] bg-[#f0dcfe] opacity-75" />
      <div aria-hidden className="blob absolute bottom-[-22%] left-[-10%] h-[50vmin] w-[50vmin] bg-[var(--mango)] opacity-35" />

      {/* Drifting toppings around the hero */}
      {[
        { t: tops[0], c: "left-[3%] top-[24%] w-[clamp(55px,8vw,130px)] rotate-[-12deg]" },
        { t: tops[1], c: "right-[5%] top-[20%] w-[clamp(48px,6.5vw,110px)] rotate-[12deg]" },
        { t: tops[2], c: "right-[8%] bottom-[12%] w-[clamp(52px,7vw,125px)] rotate-[18deg]" },
        { t: tops[3], c: "left-[8%] bottom-[10%] w-[clamp(44px,5.5vw,100px)] rotate-[-20deg]" },
      ].map((x, i) => (
        <span key={i} aria-hidden className={`ch-top drift pointer-events-none absolute ${x.c}`} style={{ animationDelay: `${i * -1.4}s` }}>
          <img src={x.t.src} alt="" className="w-full drop-shadow-[0_14px_14px_rgba(40,8,60,.18)]" />
        </span>
      ))}

      <div className="container-x relative text-center">
        {/* Eyebrow pill */}
        <p className="eyebrow ch-in inline-flex items-center gap-2">
          <span>{contactPage.eyebrow}</span>
        </p>

        {/* Big headline */}
        <Heading as="h1" lines={contactPage.heading} className="ch-in mx-auto mt-5 text-[clamp(48px,7.5vw,118px)] leading-[0.98]" />

        {/* Subtitle text */}
        <p className="ch-in mx-auto mt-6 max-w-[650px] text-[17px] leading-relaxed text-muted md:text-[19px]">
          {contactPage.subtitle}
        </p>

        {/* 4 Direct Social & Messaging Channels */}
        <div className="ch-in mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {contactPage.channels.map((c) => (
            <a
              key={c.id}
              href={c.action}
              target={c.action.startsWith("http") ? "_blank" : undefined}
              rel={c.action.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col justify-between rounded-[32px] border border-[var(--line)] bg-white/95 p-6 shadow-[var(--soft-shadow)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-18px_rgba(60,10,100,0.25)] text-left"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-[20px] transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.color, color: c.accent }}
                  >
                    {c.id === "gmail" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    )}
                    {c.id === "instagram" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {c.id === "facebook" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                      </svg>
                    )}
                    {c.id === "whatsapp" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    )}
                  </span>
                  <span className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-[11px] font-extrabold text-accent">
                    {c.badge}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-[20px] font-bold text-fg group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                <p className="mt-1 text-[14px] font-bold text-accent break-all">
                  {c.handle}
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  {c.sub}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-[12px] font-extrabold text-accent group-hover:translate-x-1 transition-transform">
                <span>Connect now</span>
                <span aria-hidden>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
