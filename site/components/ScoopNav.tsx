"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onReveal } from "./ScoopLoader";
import { nav } from "../content";

/** Tell the nav something went into the order (the cone builder does this). */
export const addToOrder = () => window.dispatchEvent(new Event("melt:order"));

/** The brand mark: a tiny scoop on a cone. */
export const ScoopMark = ({ className = "h-[1em] w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 20 26" className={className} aria-hidden>
    <path d="M4.5 12.5 10 25l5.5-12.5Z" fill="#e9b170" />
    <path d="M3 13a7 7 0 1 1 14 0c0 1.2-1.3 1.5-2.2.8-.8.9-2 .9-2.8 0-.8.9-2 .9-2.8 0-.8.9-2 .9-2.8 0C4.3 14.5 3 14.2 3 13Z" fill="currentColor" />
  </svg>
);

/** N2: one floating white pill (mark · links with a sliding pink blob · Order count). Phone: pill + full pink sheet. */
export default function ScoopNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [blob, setBlob] = useState<{ x: number; w: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const offIntro = onReveal(() => {
      if (!prefersReducedMotion()) gsap.from(ref.current, { y: -90, opacity: 0, duration: 0.9, delay: 0.3, ease: "power3.out" });
    });
    const onOrder = () => {
      setCount((n) => n + 1);
      setBump((n) => n + 1);
    };
    window.addEventListener("melt:order", onOrder);

    // Home page: the section whose top has passed 45% of the screen is "active" (Flavours has its own page)
    const onScroll = () => {
      if (window.location.pathname !== "/") return;
      const line = window.innerHeight * 0.45;
      let k = -1;
      let best = -Infinity;
      nav.links.forEach((l, i) => {
        if (!l.href.startsWith("/#") && l.href !== "/") return;
        const t = document.querySelector<HTMLElement>(l.href === "/" ? "#top" : l.href.slice(1));
        const top = t?.getBoundingClientRect().top ?? Infinity;
        if (top < line && top > best) {
          best = top;
          k = i;
        }
      });
      setActive(k);
    };
    if (window.location.pathname === "/") {
      onScroll();
    } else setActive(nav.links.findIndex((l) => l.href === window.location.pathname));

    // arriving from another page with /#section: jump there once the intro has finished
    const pending = sessionStorage.getItem("melt:goto");
    if (pending) {
      sessionStorage.removeItem("melt:goto");
      onReveal(() => {
        const t = document.querySelector<HTMLElement>(pending);
        if (!t) return;
        if (window.__lenis) window.__lenis.scrollTo(t, { immediate: true });
        else t.scrollIntoView();
      });
    }

    // links like "/#about" or "/#build": smooth scroll on the home page, remember the target when coming from another page
    const onClick = (e: MouseEvent) => {
      const home = (e.target as HTMLElement).closest("a[href='/']");
      if (home && window.location.pathname === "/") {
        e.preventDefault();
        window.__lenis?.scrollTo(0, { duration: 1.6 });
        return;
      }
      const a = (e.target as HTMLElement).closest("a[href^='/#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!.slice(1);
      if (window.location.pathname === "/") {
        const t = document.querySelector<HTMLElement>(hash);
        if (t) {
          e.preventDefault();
          window.__lenis?.scrollTo(t, { duration: 1.6 });
        }
      } else sessionStorage.setItem("melt:goto", hash);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      offIntro();
      window.removeEventListener("melt:order", onOrder);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // the pink blob slides to the active link
  useEffect(() => {
    const a = links.current[active];
    setBlob(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
  }, [active]);

  useEffect(() => {
    if (pathname !== "/") setActive(nav.links.findIndex((l) => l.href === pathname));
  }, [pathname]);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) window.__lenis?.stop();
    else if (wasOpen.current) window.__lenis?.start();
    wasOpen.current = open;
  }, [open]);

  const order = (
    <a href={nav.cta.href} aria-label={`${nav.cta.label}, ${count} items`} className="hidden lg:flex items-center gap-2 rounded-full bg-accent py-2 pr-2 pl-4 text-[14px] font-extrabold text-accent-fg transition-transform hover:scale-[1.04]">
      {nav.cta.label}
      <span key={bump} className={`tnum grid h-7 min-w-7 place-items-center rounded-full bg-white px-1.5 text-[13px] text-accent ${bump ? "order-bump" : ""}`}>
        {count}
      </span>
    </a>
  );

  return (
    <>
      <header ref={ref} className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
        <div className="flex w-full max-w-[860px] items-center justify-between gap-2 rounded-full bg-white/95 p-1.5 pl-4 shadow-[0_14px_40px_-16px_rgba(120,20,60,.35)] sm:pl-5 md:w-auto md:justify-start md:gap-4">
          <a href="/" aria-label="Malai Culture, home" className="font-display flex items-center gap-1.5 text-[20px] whitespace-nowrap text-accent sm:text-[22px] md:text-[24px]">
            <ScoopMark className="h-[1.05em] w-auto text-[#ff8fb1]" />
            {nav.logo}
          </a>
          <nav className="relative hidden items-center lg:flex">
            {blob && <span aria-hidden className="absolute top-0 h-full rounded-full bg-[var(--strawberry)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ left: blob.x, width: blob.w }} />}
            {nav.links.map((l, i) => (
              <a
                key={l.label}
                ref={(el) => {
                  links.current[i] = el;
                }}
                href={l.href}
                className={`relative rounded-full px-4 py-2.5 text-[14px] font-bold whitespace-nowrap transition-colors ${i === active ? "text-accent" : "text-fg/75 hover:text-fg"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:ml-auto">
            {order}
            {/* Mobile Hamburger Menu Icon Button - Icon only, premium rounded UI */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-[var(--strawberry)]/70 text-accent shadow-xs transition-all duration-200 hover:bg-accent hover:text-white active:scale-90 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="3" y="6" width="18" height="2.5" rx="1.25" />
                <rect x="3" y="11" width="18" height="2.5" rx="1.25" />
                <rect x="3" y="16" width="18" height="2.5" rx="1.25" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-Only Side Navbar Drawer & Backdrop */}
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          {/* Dimmed backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            aria-hidden
          />

          {/* Slide-in Side Drawer */}
          <aside
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-[80] flex h-full w-[86vw] max-w-[360px] flex-col justify-between overflow-y-auto bg-[#fff1f4] p-5 shadow-[-14px_0_40px_rgba(43,18,51,0.25)]"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#f4d3dd] pb-4">
                <div>
                  <span className="font-display flex items-center gap-1.5 text-[22px] text-accent">
                    <ScoopMark className="h-5 w-auto text-accent" />
                    {nav.logo}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-wider text-muted uppercase">Hand-churned in Anand</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-accent shadow-sm transition-transform hover:scale-105 active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Flavour of the Week Announcement Pill */}
              <div className="mt-4 rounded-2xl border border-accent/20 bg-white/90 p-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold tracking-wide text-accent uppercase">Flavour of the week</span>
                  <span className="rounded-full bg-[#fef3c7] px-2 py-0.5 text-[11px] font-bold text-[#b45309]">🥭 Mango Season</span>
                </div>
                <p className="font-display mt-1 text-[16px] font-bold text-fg">Alphonso Mango</p>
                <p className="text-[12px] text-muted">Fresh Ratnagiri mangoes with rich slow-cooked malai.</p>
              </div>

              {/* Side Nav Links with Icons */}
              <nav className="mt-4 flex flex-col gap-2">
                {nav.links.map((l, i) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-3.5 py-2.5 transition-all active:scale-[0.98] ${
                      i === active ? "bg-accent text-white shadow-md" : "bg-white/80 text-fg hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid h-8 w-8 place-items-center rounded-full text-[14px] ${i === active ? "bg-white/20 text-white" : "bg-[var(--strawberry)]/50 text-accent"}`}>
                        {l.label === "Home" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          </svg>
                        )}
                        {l.label === "Flavours" && <ScoopMark className="h-4 w-auto" />}
                        {l.label === "About Us" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        )}
                        {l.label === "Parlours" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        )}
                        {l.label === "Contact Us" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        )}
                      </span>
                      <div>
                        <span className="font-display block text-[16px] font-bold leading-tight">{l.label}</span>
                        <span className={`block text-[11px] ${i === active ? "text-white/80" : "text-muted"}`}>
                          {l.label === "Home" && "Welcome & counter"}
                          {l.label === "Flavours" && "12 scoops & family tubs"}
                          {l.label === "About Us" && "Slow churned story"}
                          {l.label === "Parlours" && "3 locations in Anand"}
                          {l.label === "Contact Us" && "Hours & hello"}
                        </span>
                      </div>
                    </div>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform group-hover:translate-x-0.5 ${i === active ? "text-white" : "text-muted"}`}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Footer & Parlour Info */}
            <div className="mt-6 flex flex-col gap-3 border-t border-[#f4d3dd] pt-4">
              <a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-[14px] font-extrabold text-white shadow-[0_6px_18px_rgba(214,28,93,0.35)] transition-transform active:scale-95"
              >
                <span>Order / Build Your Cone</span>
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-[12px] font-bold text-accent">
                  {count}
                </span>
              </a>

              <div className="rounded-2xl bg-white/70 p-3 text-[12px]">
                <div className="flex items-center gap-1.5 font-bold text-fg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent" aria-hidden>
                    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                  <span>Anand Locations:</span>
                </div>
                <p className="mt-1 font-medium text-muted">Amul Dairy Rd · V.V. Nagar · AV Road</p>
                <p className="mt-0.5 text-[11px] font-bold text-accent">Open till midnight on weekends</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
