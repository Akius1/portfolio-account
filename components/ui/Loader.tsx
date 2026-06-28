"use client";
import { useEffect, useRef } from "react";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const fill = fillRef.current;
    if (!loader || !fill) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        fill.style.width = "100%";
        setTimeout(async () => {
          const { gsap } = await import("gsap");
          gsap.to(loader, {
            yPercent: -100,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              loader.style.display = "none";
              // Fire global event so HomeAnimations knows to start
              window.dispatchEvent(new Event("loaderDone"));
            },
          });
        }, 300);
      }
      fill.style.width = Math.min(progress, 100) + "%";
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader" id="loader" ref={loaderRef}>
      <div className="loader-inner">
        <span className="loader-text">AU</span>
        <div className="loader-bar">
          <div className="loader-fill" id="loaderFill" ref={fillRef} />
        </div>
      </div>
    </div>
  );
}
