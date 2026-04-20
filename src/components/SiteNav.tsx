import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Memories" },
  { to: "/story", label: "Our Story" },
  { to: "/wishes", label: "Wishes" },
  { to: "/countdown", label: "Until We Meet" },
] as const;

export default function SiteNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-foreground/10 bg-foreground/5 px-2 py-1.5 backdrop-blur-xl shadow-[0_8px_40px_-12px_oklch(0.1_0.05_280/0.6)]">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: true }}
            className="group relative rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:text-foreground sm:text-xs sm:px-4"
            activeProps={{ className: "!text-foreground" }}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--pink)]/40 to-[var(--lavender)]/40 ring-1 ring-foreground/20"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
