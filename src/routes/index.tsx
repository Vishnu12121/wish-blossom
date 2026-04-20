import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CosmicScene from "@/components/CosmicScene";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Beautiful 🌙" },
      { name: "description", content: "A little universe of love, sent across the distance — happy birthday to my favorite person." },
    ],
  }),
});

// 💌 Personalize: swap "{Her Name}" and "— Yours" with your names
const HER_NAME = "{Her Name}";
const FROM_NAME = "— Yours, always";

const MESSAGE = [
  "The miles between us are just stars",
  "we haven't counted yet.",
  "Today the whole sky is yours —",
  "every twinkle, every soft glow of the moon,",
  "every quiet promise the universe keeps.",
  "Happy birthday, my favorite human. 🌙",
];

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        {mounted && <CosmicScene />}
      </div>

      {/* Soft vignette overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.08_0.04_280/0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-script text-2xl text-[var(--lavender)] glow-soft md:text-3xl"
        >
          across the stars, just for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-aurora glow-soft">Happy Birthday,</span>
          <br />
          <span className="text-foreground glow-soft">{HER_NAME}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.6 }}
          className="mt-12 max-w-xl space-y-2 text-base leading-relaxed text-foreground/85 md:text-lg"
        >
          {MESSAGE.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 + i * 0.25 }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4 }}
          className="font-script mt-10 text-3xl text-[var(--pink)] glow-soft md:text-4xl"
        >
          {FROM_NAME}
        </motion.p>

        {/* Floating distance badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="float-slow mt-16 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--pink)] twinkle" />
          made with love · across the distance
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavender)] twinkle" />
        </motion.div>
      </div>
    </main>
  );
}
