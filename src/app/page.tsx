import type { Metadata } from "next";

import MainWorld from "@/main/components/MainWorld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <MainWorld />;
}