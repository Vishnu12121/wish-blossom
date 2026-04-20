import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";

export const Route = createFileRoute("/story")({
  component: Story,
  head: () => ({
    meta: [
      { title: "Our Story — Across the Stars" },
      { name: "description", content: "A timeline of us, written in starlight." },
    ],
  }),
});

// 💌 Edit this timeline with your real chapters
const chapters = [
  { when: "the beginning", title: "A message at midnight", text: "Two strangers, one quiet hello. The kind of hello that turns into everything." },
  { when: "the laughter", title: "First voice note", text: "Your laugh sounded like a song I didn't know I'd been waiting for." },
  { when: "the long nights", title: "Different time zones, same moon", text: "We learned the moon is the only thing that visits us both." },
  { when: "the small things", title: "Your favorite playlist", text: "I memorized every song. I hum them on the days I miss you most." },
  { when: "today", title: "Your birthday", text: "A whole year of you, a whole sky for you. I'm so glad the universe made you." },
];

function Story() {
  return (
    <PageShell
      eyebrow="written in starlight"
      title={<><span className="text-foreground glow-soft">Our</span> <span className="text-gradient-aurora glow-soft">story</span></>}
      subtitle="A few chapters of the small infinity we've built between two cities."
    >
      <div className="relative mx-auto max-w-3xl">
        {/* center line */}
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--pink)]/50 to-transparent md:left-1/2" />

        <div className="space-y-12 md:space-y-16">
          {chapters.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${left ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
              >
                {/* dot */}
                <span className="absolute left-2.5 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--lavender)] shadow-[0_0_20px_oklch(0.82_0.14_350/0.8)] md:left-auto md:right-auto md:top-3"
                      style={left ? { right: "-1.5rem" } as never : { left: "-1.5rem" } as never} />
                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-md md:p-8">
                  <p className="font-script text-xl text-[var(--pink)]">{c.when}</p>
                  <h3 className="font-display mt-1 text-2xl text-foreground md:text-3xl">{c.title}</h3>
                  <p className="mt-3 text-foreground/75 leading-relaxed">{c.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
