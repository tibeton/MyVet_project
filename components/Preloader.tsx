"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BrandLogo from "./BrandLogo";

// Full-screen intro overlay. Holds the page under a calm brand splash until the
// document has finished loading and the first hero video frame is ready — so the
// large dog.mp4 / cat.mp4 don't pop in half-loaded. Falls back on a hard timeout
// so a slow / failed asset can never trap the visitor behind the splash.
const MIN_MS = 600; // avoid a jarring flash on fast loads
const MAX_MS = 8000; // never block longer than this

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let settled = false;
    const started = Date.now();

    const finish = () => {
      if (settled) return;
      settled = true;
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setDone(true), wait);
    };

    // 1) window load — all render-affecting resources done.
    const onLoad = () => finish();
    if (document.readyState === "complete") {
      // Still give the hero video a beat to buffer its first frame.
      window.setTimeout(finish, 400);
    } else {
      window.addEventListener("load", onLoad);
    }

    // 2) Warm the first hero video (dog.mp4 shows first) and resolve on first frame.
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.src = "/dog.mp4";
    const onData = () => finish();
    video.addEventListener("loadeddata", onData);
    video.addEventListener("error", finish);
    video.load();

    // 3) Hard safety timeout.
    const timer = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      video.removeEventListener("loadeddata", onData);
      video.removeEventListener("error", finish);
      window.clearTimeout(timer);
    };
  }, []);

  // Lock scrolling while the splash is up.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          aria-hidden="true"
        >
          {/* soft ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl" />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandLogo variant="vertical" className="h-24 w-auto sm:h-28" />
            </motion.div>

            {/* indeterminate progress bar */}
            <div className="relative h-1 w-40 overflow-hidden rounded-full bg-surface-2">
              <motion.span
                className="absolute inset-y-0 w-1/2 rounded-full bg-accent"
                animate={{ x: ["-120%", "240%"] }}
                transition={{
                  duration: 1.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
