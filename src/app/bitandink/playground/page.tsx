import WorldShell from "@/shared/components/WorldShell";
import PlaygroundView from "@/world/playground/components/PlaygroundView";

export default function PlaygroundPage() {
  return (
    <WorldShell current="playground">
      <PlaygroundView />
    </WorldShell>
  );
}