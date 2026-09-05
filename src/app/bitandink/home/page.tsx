import type { Metadata } from "next";

import WorldHome from "@/world/home/components/WorldHome";

export const metadata: Metadata = {
  title: "Home",

  description:
    "beanlog의 가상 세계 허브. Beanlog, Playground, Webzine, Portfolio로 이어지는 bitandink의 디지털 공간.",

  alternates: {
    canonical: "/bitandink/home",
  },

  openGraph: {
    title: "Home | beanlog",
    description:
      "beanlog의 가상 세계 허브. Beanlog, Playground, Webzine, Portfolio로 이어지는 bitandink의 디지털 공간.",
    url: "/bitandink/home",
  },
};

export default function BitandinkHomePage() {
  return <WorldHome />;
}