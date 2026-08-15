"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HOLD = 6500;

export function Banner({ slides, children }: { slides: string[]; children: React.ReactNode }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), HOLD);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {slides.map((src, n) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            n === i ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={src}
            alt=""
            className={cn(
              "h-full w-full object-cover object-[45%_center] will-change-transform",
              n === i ? "animate-banner-ken" : "",
            )}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/78" />
      <div className="relative z-10">{children}</div>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Slide ${n + 1}`}
            onClick={() => setI(n)}
            className={cn(
              "h-px overflow-hidden rounded-full transition-all duration-700",
              n === i ? "w-10 bg-gold" : "w-5 bg-white/35 hover:bg-white/60",
            )}
          />
        ))}
      </div>
    </section>
  );
}
