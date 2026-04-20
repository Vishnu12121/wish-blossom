import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import StarryBackdrop from "./StarryBackdrop";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({ eyebrow, title, subtitle, children }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">{mounted && <StarryBackdrop />}</div>
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_top,transparent_30%,oklch(0.08_0.04_280/0.7)_100%)]" />

      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {eyebrow && (
            <p className="font-script text-2xl text-[var(--lavender)] glow-soft md:text-3xl">{eyebrow}</p>
          )}
          <h1 className="font-display mt-3 text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-xl text-base text-foreground/75 md:text-lg">{subtitle}</p>
          )}
        </motion.header>

        <div className="mt-16 md:mt-24">{children}</div>
      </div>
    </main>
  );
}
