import ScoopNav from "./components/ScoopNav";
import AboutHero from "./components/AboutHero";
import AboutPillars from "./components/AboutPillars";
import AboutProcess from "./components/AboutProcess";
import AboutValues from "./components/AboutValues";
import MeltFooter from "./components/MeltFooter";

const ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#eed5ff"/><path d="M11.5 16 16 28l4.5-12Z" fill="#e9b170"/><circle cx="16" cy="13" r="7" fill="#52188a"/></svg>',
)}`;

/** The dedicated /about page: full story, philosophy, pillars, process, and promise of Cream Crust. */
export default function AboutPage() {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href={ICON} />
      <ScoopNav />
      <main className="relative z-[1] overflow-x-clip">
        <AboutHero />
        <AboutPillars />
        <AboutProcess />
        <AboutValues />
      </main>
      <MeltFooter />
    </>
  );
}
