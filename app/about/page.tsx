import type { Metadata } from "next";
import Loader from "@/components/engine/Loader";
import Cursor from "@/components/engine/Cursor";
import SmoothScroll from "@/components/engine/SmoothScroll";
import Animations from "@/components/engine/Animations";
import AboutPage from "@/site/AboutPage";
import { meta } from "@/site/site";

export const metadata: Metadata = {
  title: `About Us — ${meta.name}`,
  description: "The story, craft, and philosophy behind Cream Crust. Handcrafted small-batch ice cream from pure farm milk, slow-churned daily.",
};

// Same engine as the home page (smooth scroll, animations, cursor).
export default function About() {
  return (
    <>
      <Loader text={meta.name} enabled={false} />
      <SmoothScroll />
      <Animations />
      {meta.cursor !== false && <Cursor />}
      <AboutPage />
    </>
  );
}
