"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { tloc } from "@/lib/utils";
import type { LText } from "@/data/types";

export type StudioVideo = { src: string; poster: string; label: LText };
export type StudioPhoto = { src: string; label: LText; span?: string };

export function AcademyStudio({
  locale,
  videos,
  photos,
  videoTitle,
  videoLead,
  photoTitle,
  photoLead,
}: {
  locale: string;
  videos: StudioVideo[];
  photos: StudioPhoto[];
  videoTitle: string;
  videoLead: string;
  photoTitle: string;
  photoLead: string;
}) {
  const [clip, setClip] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = player.current;
    if (!el) return;
    el.load();
  }, [clip]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => {
      setOpen((i) => {
        if (i === null) return i;
        return (i + dir + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = videos[clip];

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-8">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold-fg">{videoTitle}</p>
        <h2 className="display mt-2 text-4xl md:text-6xl">{videoLead}</h2>
        <div className="mt-8 overflow-hidden bg-black">
          <video
            key={current.src}
            ref={player}
            className="mx-auto max-h-[72vh] w-full bg-black object-contain"
            poster={current.poster}
            controls
            playsInline
            preload="metadata"
          >
            <source src={current.src} type="video/mp4" />
          </video>
        </div>
        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-gold-fg">{tloc(current.label, locale)}</p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setClip(i)}
              className={`group relative w-40 shrink-0 text-left ${i === clip ? "ring-1 ring-gold" : ""}`}
            >
              <span className="relative block aspect-video overflow-hidden bg-black">
                <img src={v.poster} alt="" className="h-full w-full object-cover opacity-90" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <Play className={`h-6 w-6 ${i === clip ? "text-gold" : "text-white"}`} />
                </span>
              </span>
              <span className="mt-1.5 block text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {tloc(v.label, locale)}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold-fg">{photoTitle}</p>
        <h2 className="display mt-2 text-4xl md:text-6xl">{photoLead}</h2>
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden ${p.span === "wide" ? "col-span-2" : ""} ${
                i === 0 ? "min-h-[240px] md:min-h-[420px]" : "min-h-[180px] md:min-h-[240px]"
              }`}
            >
              <img
                src={p.src}
                alt={tloc(p.label, locale)}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-left text-[0.62rem] uppercase tracking-[0.16em] text-white/90">
                {tloc(p.label, locale)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {open !== null ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 px-4" onClick={close}>
          <button type="button" className="absolute right-5 top-5 text-white" onClick={close} aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-gold md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <figure className="max-h-[90vh] max-w-[1200px]" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt="" className="max-h-[82vh] w-full object-contain" />
            <figcaption className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.2em] text-gold">
              {tloc(photos[open].label, locale)} · {open + 1}/{photos.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-gold md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      ) : null}
    </>
  );
}
