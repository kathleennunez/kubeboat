"use client";

import { useEffect, useState } from "react";

export default function ScrollVoyageTimeline() {
  const [progress, setProgress] = useState(0);
  const milestones = [0, 25, 50, 75, 100];
  const wakeWidth = Math.max(0, progress - 6);

  useEffect(() => {
    function updateProgress() {
      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const next = (window.scrollY / scrollableHeight) * 100;
      setProgress(Math.max(0, Math.min(100, next)));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div aria-hidden className="scroll-voyage pointer-events-none fixed inset-x-0 bottom-0 z-[60] pb-2 sm:pb-3">
      <div className="relative h-11">
        <div className="timeline-track absolute bottom-0 left-0 right-0 h-3 overflow-hidden border-y border-outline-variant bg-surface-container-highest/95">
          <div className="timeline-wave absolute inset-0" />
          <div className="timeline-wave-secondary absolute inset-0" />
          <div className="timeline-wake absolute left-0 top-0 h-full" style={{ width: `${wakeWidth}%` }} />
          <div className="timeline-progress absolute left-0 top-0 h-full bg-primary" style={{ width: `${progress}%` }} />
        </div>

        <div className="absolute bottom-1 left-0 right-0 h-5">
          {milestones.map((mark) => (
            <span
              key={mark}
              className={`timeline-marker absolute h-3 w-3 -translate-x-1/2 rounded-full border ${
                progress >= mark ? "border-primary bg-primary/90" : "border-outline-variant bg-surface-container"
              }`}
              style={{ left: `${mark}%` }}
            />
          ))}

          <div className="timeline-boat absolute bottom-0" style={{ left: `${progress}%` }}>
            <span className="timeline-boat-icon material-symbols-outlined text-2xl text-primary sm:text-3xl">directions_boat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
