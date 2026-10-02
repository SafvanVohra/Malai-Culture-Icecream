"use client";

import { useState } from "react";
import DripEdge from "./DripEdge";
import Heading from "./Heading";
import Photo from "./Photo";
import { parlours } from "../content";

const INQUIRY_TYPES = [
  "Catering & Wedding Tubs",
  "Party / Live Waffle Counter",
  "Flavour Feedback",
  "Franchise / Bulk Inquiry",
  "General Hello",
];

export default function ContactForm() {
  const [selectedType, setSelectedType] = useState(INQUIRY_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative z-[1] bg-surface pt-[clamp(110px,12vw,190px)] pb-[clamp(80px,10vw,150px)]">
      <DripEdge color="var(--bg)" layout={1} />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left: Contact Form */}
          <div>
            <span className="eyebrow !bg-[var(--bg)]">Send A Message</span>
            <Heading lines={["Drop a line to our", "*churnery team*"]} className="mt-4 text-[clamp(36px,4.5vw,72px)]" />
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Whether you need 50 tubs for a family reception or have a question about our slow-churned malai, send us your details below.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-[36px] border border-[var(--line)] bg-[var(--bg)] p-8 text-center shadow-[var(--soft-shadow)] md:p-12">
                <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-accent text-[28px] text-white">
                  ✓
                </span>
                <h4 className="font-display mt-5 text-[26px] font-bold text-fg">Message Received!</h4>
                <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">
                  Thank you for reaching out to Cream Crust. Our parlour and churnery team will get back to you via email or phone within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="mt-6 rounded-full bg-accent px-6 py-2.5 text-[14px] font-extrabold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Inquiry Type Pills */}
                <div>
                  <label className="label block mb-2.5">What is this regarding?</label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${
                          selectedType === type
                            ? "bg-accent text-white shadow-xs"
                            : "bg-[var(--bg)] text-fg/80 hover:bg-[var(--strawberry)]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="label block mb-2">
                      Your Name
                    </label>
                    <input
                      id="c-name"
                      required
                      type="text"
                      placeholder="e.g. Ananya Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-5 py-3.5 text-[15px] outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="label block mb-2">
                      Phone Number
                    </label>
                    <input
                      id="c-phone"
                      required
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-5 py-3.5 text-[15px] outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="c-email" className="label block mb-2">
                    Email Address
                  </label>
                  <input
                    id="c-email"
                    required
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-5 py-3.5 text-[15px] outline-none transition-colors focus:border-accent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="c-msg" className="label block mb-2">
                    Your Message / Order Details
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    required
                    placeholder="Tell us what you have in mind (date of event, guest count, favourite flavours, etc.)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[24px] border border-[var(--line)] bg-[var(--bg)] p-5 text-[15px] outline-none transition-colors focus:border-accent"
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-solid w-full justify-center text-[15px] sm:w-auto">
                  <span>Send Message</span>
                  <span aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Parlour Visual & Direct Info Card */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--bg)] p-6 shadow-[var(--soft-shadow)] md:p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px]">
                <Photo photo={parlours.photo.photo} tone={parlours.photo.tone} hint={parlours.photo.hint} alt="Cream Crust parlour" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--strawberry)] text-accent">
                    📍
                  </span>
                  <div>
                    <h5 className="font-display text-[17px] font-bold">Flagship Churnery & Parlour</h5>
                    <p className="mt-1 text-[13px] text-muted">Heritage Square, Amul Dairy Road, Anand, Gujarat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--strawberry)] text-accent">
                    ⏰
                  </span>
                  <div>
                    <h5 className="font-display text-[17px] font-bold">Parlour Timings</h5>
                    <p className="mt-1 text-[13px] text-muted">12:00 PM – 12:00 AM (Open all 7 days)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--strawberry)] text-accent">
                    ⚡
                  </span>
                  <div>
                    <h5 className="font-display text-[17px] font-bold">Instant Support</h5>
                    <p className="mt-1 text-[13px] text-muted">WhatsApp: +91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Delivery Note */}
            <div className="rounded-[32px] border border-accent/20 bg-accent p-6 text-white shadow-md">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">Need Ice Cream Right Now?</span>
              <h4 className="font-display mt-2 text-[22px] font-bold">Order for same-day delivery</h4>
              <p className="mt-1.5 text-[14px] text-white/85 leading-relaxed">
                Pick your favourite fresh churn scoops or family tubs online. Packed in dry ice insulated boxes.
              </p>
              <a href="/#build" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-extrabold text-accent transition-transform hover:scale-105 active:scale-95">
                <span>Build your cone</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
