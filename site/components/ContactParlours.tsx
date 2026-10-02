"use client";

import DripEdge from "./DripEdge";
import Heading from "./Heading";
import { contactPage } from "../content";

const PIN = "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";

export default function ContactParlours() {
  const { locations, catering } = contactPage;

  return (
    <section className="relative z-[1] bg-[var(--blueberry)] pt-[clamp(110px,12vw,190px)] pb-[clamp(90px,10vw,160px)]">
      <DripEdge color="var(--surface)" layout={2} flip />

      <div className="container-x">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow !bg-white/90">Visit Our Parlours</p>
          <Heading lines={["Step in for a", "*fresh scoop*"]} className="mt-4 text-[clamp(42px,5.2vw,88px)] text-[#220c30]" />
          <p className="mt-4 text-[16px] text-[#220c30]/80 md:text-[17px]">
            Come experience the aroma of fresh waffle cones and taste today's fresh churns right from the counter.
          </p>
        </div>

        {/* 3 Parlour Location Cards */}
        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <div
              key={loc.name}
              className="flex flex-col justify-between rounded-[36px] bg-white p-7 shadow-[0_18px_36px_-18px_rgba(20,20,80,0.3)] transition-transform duration-300 hover:-translate-y-2 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--strawberry)] text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d={PIN} fillRule="evenodd" />
                    </svg>
                  </span>
                  <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-[11px] font-extrabold text-accent">
                    {loc.note}
                  </span>
                </div>

                <h4 className="font-display mt-6 text-[22px] font-bold text-fg">
                  {loc.name}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {loc.address}
                </p>

                <div className="mt-5 space-y-1.5 text-[13px] border-t border-[var(--line)] pt-4">
                  <p className="font-bold text-fg">
                    <span className="text-muted">Hours: </span>{loc.hours}
                  </p>
                  <p className="font-bold text-fg">
                    <span className="text-muted">Phone: </span>{loc.phone}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-2.5">
                <a
                  href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-1 rounded-full bg-accent py-2.5 text-center text-[13px] font-extrabold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Call Parlour
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + " " + loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--bg)] px-4 py-2.5 text-[13px] font-bold text-fg transition-colors hover:bg-[var(--strawberry)]"
                >
                  Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Wedding / Catering Live Counter Banner */}
        <div className="mt-16 overflow-hidden rounded-[36px] border border-white/40 bg-white/95 p-8 shadow-[var(--soft-shadow)] md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="eyebrow !bg-[var(--bg)]">Events & Catering</span>
              <h3 className="font-display mt-4 text-[clamp(28px,3vw,44px)] font-bold text-fg">
                {catering.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">
                {catering.text}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col justify-center">
              <a
                href={`tel:${catering.phone.replace(/[^0-9+]/g, "")}`}
                className="btn btn-solid justify-center text-center text-[14px]"
              >
                <span>Call Party Desk: {catering.phone}</span>
              </a>
              <a
                href={`mailto:${catering.email}`}
                className="btn btn-outline justify-center text-center text-[14px]"
              >
                <span>Email: {catering.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
