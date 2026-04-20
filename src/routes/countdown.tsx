import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";

export const Route = createFileRoute("/countdown")({
  component: Countdown,
  head: () => ({
    meta: [
      { title: "Until We Meet — Across the Stars" },
      { name: "description", content: "Counting down the days until we're in the same sky." },
    ],
  }),
});

// 💌 Set the date you'll meet (YYYY-MM-DD or full ISO)
const TARGET = "2026-12-31T00:00:00";

function diff(target: Date) {
  const now = new Date().getTime();
  const t = target.getTime() - now;
  if (t <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(t / 86_400_000),
    hours: Math.floor((t / 3_600_000) % 24),
    minutes: Math.floor((t / 60_000) % 60),
    seconds: Math.floor((t / 1000) % 60),
    done: false,
  };
}

function Unit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center rounded-3xl border border-foreground/10 bg-gradient-to-b from-foreground/[0.08] to-foreground/[0.02] px-4 py-6 backdrop-blur-xl shadow-[0_30px_60px_-25px_oklch(0.08_0.05_280/0.9)] sm:px-6 sm:py-8"
    >
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--pink)]/60 to-transparent" />
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-5xl font-light text-foreground glow-soft sm:text-6xl md:text-7xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60 sm:text-xs">{label}</span>
    </motion.div>
  );
}

function Countdown() {
  const target = new Date(TARGET);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageShell
      eyebrow="every second, a little closer"
      title={<><span className="text-foreground glow-soft">Until</span> <span className="text-gradient-aurora glow-soft">we meet</span></>}
      subtitle={t.done
        ? "We're finally in the same sky. 🌙"
        : "Two cities, one countdown. The wait is the prelude — the meeting is the song."}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        <Unit value={t.days} label="days" delay={0.1} />
        <Unit value={t.hours} label="hours" delay={0.2} />
        <Unit value={t.minutes} label="minutes" delay={0.3} />
        <Unit value={t.seconds} label="seconds" delay={0.4} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="font-script mx-auto mt-16 max-w-md text-center text-2xl text-[var(--pink)] glow-soft md:text-3xl"
      >
        and when I finally see you, I'll know every star helped me wait.
      </motion.p>
    </PageShell>
  );
}
