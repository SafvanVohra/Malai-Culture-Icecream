"use client";

import DripEdge from "./DripEdge";
import Heading from "./Heading";
import { aboutPage } from "../content";

export default function AboutProcess() {
  const { process } = aboutPage;
  return (
    <section className="relative z-[1] bg-[var(--mango)] pt-[clamp(110px,12vw,190px)] pb-[clamp(80px,9vw,140px)]">
      <DripEdge color="var(--surface)" layout={0} flip />
      <div className="container-x">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow !bg-white/90">{process.eyebrow}</p>
          <Heading lines={process.heading} className="mt-4 text-[clamp(42px,5.2vw,88px)] text-[#220c30]" />
          <p className="mt-4 text-[16px] text-[#220c30]/80 md:text-[17px]">
            {process.text}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <div
              key={s.time}
              className="relative flex flex-col justify-between rounded-[32px] bg-white p-6 shadow-[0_14px_30px_-14px_rgba(70,30,10,0.22)] transition-transform duration-300 hover:-translate-y-1.5 md:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="tnum font-display rounded-full bg-[var(--mango)]/30 px-3 py-1 text-[13px] font-extrabold text-[#78350f]">
                    {s.time}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-wider text-muted uppercase">
                    Step 0{i + 1}
                  </span>
                </div>

                <h4 className="font-display mt-5 text-[22px] font-bold text-fg">
                  {s.title}
                </h4>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <span className="inline-block rounded-full bg-[var(--bg)] px-3 py-1 text-[11px] font-bold text-accent">
                  {s.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
