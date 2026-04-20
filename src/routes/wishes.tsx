import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";

export const Route = createFileRoute("/wishes")({
  component: Wishes,
  head: () => ({
    meta: [
      { title: "Birthday Wishes — Across the Stars" },
      { name: "description", content: "A letter for her birthday, signed across the distance." },
    ],
  }),
});

const letter = [
  "On your birthday, I want you to feel the weight of how loved you are — the kind of love that doesn't need to share a room to share a life.",
  "I wish you mornings that feel like soft music. Tea that's the perfect temperature. A sky that surprises you at least once a week.",
  "I wish you people who see you the way I do — completely, gently, with the lights on.",
  "I wish you a year where every dream you whisper to yourself at 2 a.m. quietly nods and says: okay, let's go.",
  "And if the world ever feels too big, remember: somewhere, someone is looking up at the same moon, thinking only of you.",
];

function Wishes() {
  return (
    <PageShell
      eyebrow="a letter, just for you"
      title={<><span className="text-gradient-aurora glow-soft">My wishes</span> <span className="text-foreground glow-soft">for your year</span></>}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative mx-auto max-w-2xl rounded-3xl border border-foreground/10 bg-gradient-to-b from-foreground/[0.06] to-foreground/[0.02] p-8 backdrop-blur-xl shadow-[0_40px_80px_-30px_oklch(0.08_0.05_280/0.9)] md:p-12"
      >
        {/* corner stars */}
        <span className="absolute -top-2 -left-2 h-4 w-4 rotate-45 rounded-sm bg-gradient-to-br from-[var(--pink)] to-[var(--lavender)] shadow-[0_0_20px_oklch(0.82_0.14_350/0.8)]" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 rotate-45 rounded-sm bg-gradient-to-br from-[var(--lavender)] to-[var(--pink)] shadow-[0_0_20px_oklch(0.78_0.12_295/0.8)]" />

        <p className="font-script text-3xl text-[var(--pink)] glow-soft md:text-4xl">Dear you,</p>

        <div className="mt-6 space-y-5 text-foreground/85 md:text-lg leading-relaxed">
          {letter.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="font-script mt-10 text-right text-3xl text-[var(--lavender)] glow-soft md:text-4xl"
        >
          forever yours, across the stars
        </motion.p>
      </motion.article>
    </PageShell>
  );
}
