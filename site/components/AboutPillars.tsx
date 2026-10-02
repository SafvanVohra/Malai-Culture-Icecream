"use client";

import DripEdge from "./DripEdge";
import Heading from "./Heading";
import { aboutPage } from "../content";

export default function AboutPillars() {
  return (
    <section className="relative z-[1] bg-surface pt-[clamp(110px,12vw,190px)] pb-[clamp(80px,9vw,140px)]">
      <DripEdge color="var(--bg)" layout={1} />
      <div className="container-x">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow !bg-[var(--bg)]">The Foundation</p>
          <Heading lines={["The 4 pillars of", "*Cream Crust*"]} className="mt-4 text-[clamp(42px,5.2vw,88px)]" />
          <p className="mt-4 text-[16px] text-muted md:text-[17px]">
            Every recipe we create and every scoop we serve is guided by four uncompromising culinary principles.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {aboutPage.pillars.map((p, i) => (
            <article
              key={p.title}
              className="capsule group relative flex flex-col justify-between overflow-hidden p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(60,10,100,0.25)] md:p-9"
              style={{ background: p.fill, color: "#220c30" }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="tag !bg-white/85 text-[11px] font-extrabold tracking-wider uppercase text-accent">
                    {p.tag}
                  </span>
                  <span className="font-display text-[22px] font-bold opacity-35">0{i + 1}</span>
                </div>

                <h3 className="font-display mt-6 text-[clamp(26px,2.6vw,38px)] leading-[1.05] font-bold">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed opacity-85 md:text-[16px]">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 pt-4 border-t border-black/10">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[12px] font-bold tracking-wide uppercase opacity-75">Cream Crust Standard</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
