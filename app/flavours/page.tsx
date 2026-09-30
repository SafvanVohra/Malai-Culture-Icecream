import type { Metadata } from "next";
import Loader from "@/components/engine/Loader";
import Cursor from "@/components/engine/Cursor";
import SmoothScroll from "@/components/engine/SmoothScroll";
import Animations from "@/components/engine/Animations";
import FlavoursPage from "@/site/FlavoursPage";
import { meta } from "@/site/site";

export const metadata: Metadata = {
  title: `Flavours — ${meta.name}`,
  description: "Every Malai Culture scoop, sundae, family tub, thick shake, ice-cream cake and kulfi, sorted by category.",
};

// Same engine as the home page (smooth scroll, animations, cursor). The scoop loader only plays on the home page.
export default function Flavours() {
  return (
    <>
      <Loader text={meta.name} enabled={false} />
      <SmoothScroll />
      <Animations />
      {meta.cursor !== false && <Cursor />}
      <FlavoursPage />
    </>
  );
}
