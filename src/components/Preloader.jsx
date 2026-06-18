import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoaderContent from "./LoaderContent";

export default function Preloader({ onComplete }) {
  const [pct, setPct] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1.5 seconds to reach 100%
    // 1500ms / 50ms = 30 intervals
    // 100 / 30 = 3.333 per interval
    let p = 0;
    const iv = setInterval(() => {
      p += 100 / 30;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        // Start fade out
        setIsVisible(false);
        // Wait for fade out to complete before unmounting
        setTimeout(() => onComplete(), 800);
      }
      setPct(Math.round(p));
    }, 50);

    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            pointerEvents: 'auto',
            background: '#07091a'
          }}
        >
          <LoaderContent pct={pct} style={{ width: '100vw', height: '100vh' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
