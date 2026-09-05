import type { Metadata } from "next";

import WorldShell from "@/shared/components/WorldShell";
import PlaygroundView from "@/world/playground/components/PlaygroundView";

export const metadata: Metadata = {
  title: "Playground",

  description:
    "bitandink가 인터랙션, UI, 사운드와 작은 웹 아이디어를 직접 만들고 실험하는 개발 놀이터.",

  alternates: {
    canonical: "/bitandink/playground",
  },

  openGraph: {
    title: "Playground | beanlog",
    description:
      "bitandink가 인터랙션, UI, 사운드와 작은 웹 아이디어를 직접 만들고 실험하는 개발 놀이터.",
    url: "/bitandink/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <WorldShell current="playground">
      <PlaygroundView />
    </WorldShell>
  );
}