import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface Props {
  src: string;
  caption: string;
  date?: string;
  index: number;
}

export default function TiltCard({ src, caption, date, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 shadow-[0_30px_60px_-20px_oklch(0.1_0.05_280/0.9)]"
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          width={768}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transform: "translateZ(0)" }}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.05_280/0.9)] via-transparent to-transparent" />
        {/* shimmer on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
             style={{ background: "linear-gradient(115deg, transparent 30%, oklch(1 0 0 / 0.15) 50%, transparent 70%)" }} />
        {/* caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: "translateZ(40px)" }}>
          {date && <p className="font-script text-lg text-[var(--pink)]">{date}</p>}
          <p className="font-display text-xl text-foreground md:text-2xl">{caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
