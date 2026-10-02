"use client";

import DripEdge from "./DripEdge";
import Heading from "./Heading";
import Photo from "./Photo";
import { aboutPage, parlours } from "../content";

export default function AboutValues() {
  const { promises, quote } = aboutPage;

  return (
    <section className="relative z-[1] bg-[var(--bg)] pt-[clamp(110px,12vw,190px)] pb-[clamp(90px,10vw,160px)]">
      <DripEdge color="var(--mango)" layout={2} flip />

      <div className="container-x">
        {/* Promises section */}
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow">Our Uncompromising Promise</p>
          <Heading lines={["Honest craft in", "*every scoop*"]} className="mt-4 text-[clamp(42px,5.2vw,88px)]" />
          <p className="mt-4 text-[16px] text-muted md:text-[17px]">
            We will never cut corners for convenience or scale. What you taste is always pure, authentic, and made with devotion.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {promises.map((p, i) => (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-[32px] border border-[var(--line)] bg-white p-6 shadow-[var(--soft-shadow)] transition-all duration-300 hover:-translate-y-1.5 md:p-7"
            >
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--strawberry)] font-display text-[15px] font-bold text-accent">
                  ✓
                </span>
                <h4 className="font-display mt-5 text-[20px] font-bold leading-snug text-fg">
                  {p.title}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-accent">
                <span>Certified Pure</span>
                <span>•</span>
                <span>Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Parlour Ambiance & Founders Quote */}
        <div className="mt-20 overflow-hidden rounded-[40px] border border-[var(--line)] bg-white p-7 shadow-[0_20px_50px_-20px_rgba(60,10,100,0.2)] md:p-12 lg:mt-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <span className="eyebrow !bg-[var(--bg)]">Founders' Voice</span>
              <blockquote className="font-['Caveat_Variable'] mt-5 text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.15] text-accent">
                “{quote.text}”
              </blockquote>
              <div className="mt-6">
                <p className="font-display text-[20px] font-bold text-fg">{quote.author}</p>
                <p className="text-[13px] font-bold text-muted uppercase tracking-wider">{quote.role}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/flavours" className="btn btn-solid">
                  Explore Flavours
                </a>
                <a href="/#parlours" className="btn btn-outline">
                  Visit Parlours
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-md">
              <Photo photo={parlours.photo.photo} tone={parlours.photo.tone} hint={parlours.photo.hint} alt="Cream Crust parlour atmosphere" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
