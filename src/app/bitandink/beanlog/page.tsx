import type { Metadata } from "next";

import WorldShell from "@/shared/components/WorldShell";
import BeanlogView from "@/world/beanlog/components/BeanlogView";
import { getBeanlogEntries } from "@/world/beanlog/lib/getBeanlogEntries";

export const metadata: Metadata = {
  title: "Beanlog",

  description:
    "BEAN, PAMA, HODU가 각자의 시선으로 남기는 beanlog의 작은 기록들.",

  alternates: {
    canonical: "/bitandink/beanlog",
  },

  openGraph: {
    title: "Beanlog | beanlog",
    description:
      "BEAN, PAMA, HODU가 각자의 시선으로 남기는 beanlog의 작은 기록들.",
    url: "/bitandink/beanlog",
  },
};

export default function BeanlogPage() {
  const entries = getBeanlogEntries();

  return (
    <WorldShell current="beanlog">
      <BeanlogView entries={entries} />
    </WorldShell>
  );
}