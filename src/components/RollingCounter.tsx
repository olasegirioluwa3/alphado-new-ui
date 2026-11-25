"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RollingCounterProps {
  value: number;
  prefix?: string;
  className?: string;
}

export function RollingCounter({
  value,
  prefix = "",
  className = "",
}: RollingCounterProps) {
  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");

  return (
    <span
      className={`inline-flex items-baseline tabular-nums ${className}`}
      aria-label={`${prefix}${formatted}`}
    >
      {prefix && <span>{prefix}</span>}
      {chars.map((char, idx) =>
        char === "," ? (
          <span key={`sep-${idx}`} className="mx-[0.5px]">
            ,
          </span>
        ) : (
          <span
            key={`pos-${idx}`}
            className="relative inline-flex h-[1.15em] w-[0.62em] justify-center overflow-hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${idx}-${char}`}
                initial={{ y: "85%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-85%", opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 28,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        )
      )}
    </span>
  );
}
