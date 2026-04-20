import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import TiltCard from "@/components/TiltCard";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Memories — Across the Stars" },
      { name: "description", content: "A little gallery of moments and memories — for her birthday." },
    ],
  }),
});

// 💌 Swap captions/dates with your real memories
const memories = [
  { src: m1, caption: "The night you said you'd stay", date: "first hello" },
  { src: m2, caption: "Two silhouettes, one sky", date: "always" },
  { src: m3, caption: "Tea and a pink moon", date: "rainy thursday" },
  { src: m4, caption: "Wishes, rising", date: "your birthday eve" },
  { src: m5, caption: "Letters I never sent", date: "kept forever" },
  { src: m6, caption: "Two boats, one shore someday", date: "soon" },
];

function Gallery() {
  return (
    <PageShell
      eyebrow="a little universe of us"
      title={<><span className="text-gradient-aurora glow-soft">Memories,</span> <span className="text-foreground glow-soft">softly held</span></>}
      subtitle="Hover each moment — every memory tilts, the way they do in my mind when I think of you."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {memories.map((m, i) => (
          <TiltCard key={i} index={i} {...m} />
        ))}
      </div>
    </PageShell>
  );
}
