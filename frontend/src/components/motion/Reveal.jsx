import { motion } from "framer-motion";

const VARIANTS = {
  up: { y: 32, opacity: 0 },
  down: { y: -32, opacity: 0 },
  left: { x: 32, opacity: 0 },
  right: { x: -32, opacity: 0 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={VARIANTS[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, className, staggerDelay = 0.1, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, direction = "up" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { ...VARIANTS[direction] },
        show: { x: 0, y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
