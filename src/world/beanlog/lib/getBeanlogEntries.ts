import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type {
  BeanlogEntry,
  BeanlogResident,
} from "../types";

const CONTENT_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "beanlog"
);

function isResident(
  value: unknown
): value is BeanlogResident {
  return (
    value === "bean" ||
    value === "pama" ||
    value === "hodu"
  );
}

export function getBeanlogEntries(): BeanlogEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  const entries = files
    .map((file) => {
      const filePath = path.join(
        CONTENT_DIR,
        file
      );

      const raw = fs.readFileSync(
        filePath,
        "utf8"
      );

      const { data, content } =
        matter(raw);

      if (
        !isResident(data.resident) ||
        typeof data.date !== "string" ||
        typeof data.mood !== "string"
      ) {
        return null;
      }

      return {
        resident: data.resident,
        date: data.date,
        mood: data.mood,
        content: content.trim(),
      } satisfies BeanlogEntry;
    })
    .filter(
      (
        entry
      ): entry is BeanlogEntry =>
        entry !== null
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );

  return entries;
}