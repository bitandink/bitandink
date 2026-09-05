import type { Metadata } from "next";

import BitandinkRoom from "@/gateway/components/BitandinkRoom";

export const metadata: Metadata = {
  title: "Enter bitandink",

  description:
    "bitandink의 방에서 모니터 너머의 가상 세계 beanlog로 들어가는 입구.",

  alternates: {
    canonical: "/bitandink",
  },

  openGraph: {
    title: "Enter bitandink | beanlog",
    description:
      "bitandink의 방에서 모니터 너머의 가상 세계 beanlog로 들어가는 입구.",
    url: "/bitandink",
  },
};

export default function BitandinkPage() {
  return (
    <main>
      <BitandinkRoom />
    </main>
  );
}