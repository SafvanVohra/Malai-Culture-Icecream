import type { Metadata } from "next";
import Loader from "@/components/engine/Loader";
import Cursor from "@/components/engine/Cursor";
import SmoothScroll from "@/components/engine/SmoothScroll";
import Animations from "@/components/engine/Animations";
import ContactPage from "@/site/ContactPage";
import { meta } from "@/site/site";

export const metadata: Metadata = {
  title: `Contact Us — ${meta.name}`,
  description: "Get in touch with Cream Crust. Parlour locations in Anand, catering & party inquiries, WhatsApp, Instagram, Facebook, and Gmail.",
};

// Same engine as the home page (smooth scroll, animations, cursor).
export default function Contact() {
  return (
    <>
      <Loader text={meta.name} enabled={false} />
      <SmoothScroll />
      <Animations />
      {meta.cursor !== false && <Cursor />}
      <ContactPage />
    </>
  );
}
