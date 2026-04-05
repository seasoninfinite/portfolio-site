import type { Metadata } from "next";

import { DemoOne } from "@/components/demo";

export const metadata: Metadata = {
  title: "UK Web Designer & Website Maker",
  keywords: [
    "web designer UK",
    "website designer UK",
    "website maker UK",
    "freelance web designer UK",
    "custom websites UK",
    "web developer UK",
    "small business website design",
    "professional website design",
  ],
};

export default function Home() {
  return <DemoOne />;
}
