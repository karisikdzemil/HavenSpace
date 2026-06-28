import { motion } from "framer-motion";

const DISTANCE = 24;

const VARIANTS = {
  up: { y: DISTANCE, opacity: 0 },
  down: { y: -DISTANCE, opacity: 0 },
  left: { x: DISTANCE, opacity: 0 },
  right: { x: -DISTANCE, opacity: 0 },
  scale: { scale: 0.94, opacity: 0 },
};

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = false,
}) {
  return (
    <motion.div
      className={className}
      initial={VARIANTS[direction]}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, className, staggerDelay = 0.08, once = false }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15, margin: "0px 0px -80px 0px" }}
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
        show: { x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.45, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
