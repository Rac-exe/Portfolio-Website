import type { Metadata } from "next";

import { SITE } from "../lib/site";
import PingMeForm from "./PingMeForm";

export const metadata: Metadata = {
  title: "Ping me",
  description: "Get in touch with Prabhat Bajpai.",
};

export default function PingMePage() {
  return (
    <>
      <header>
        <h1 className="page-title">Ping me</h1>
        <p className="lede">
          Email me at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or leave a
          message below with somewhere I can reply. Context, a link, or just the
          thing you want to talk about is plenty.
        </p>
      </header>

      <PingMeForm />
    </>
  );
}
