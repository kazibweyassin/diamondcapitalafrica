"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/content";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative">
      <div className="relative h-[26rem] overflow-hidden sm:h-[30rem] md:h-[35rem] lg:h-[38.75rem]">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/20 sm:from-primary/75 sm:via-primary/45 sm:to-transparent" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-2xl pr-2 transition-all duration-700 sm:pr-12 ${
              isTransitioning
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-white/85 sm:mb-8 sm:text-base md:text-lg">
              {slide.description}
            </p>
            <Link
              href={slide.cta.href}
              className="inline-flex min-h-11 items-center gap-2 rounded bg-gold px-5 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light sm:px-6"
            >
              {slide.cta.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/20 sm:left-4 sm:inline-flex md:left-8"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/20 sm:right-4 sm:inline-flex md:right-8"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              style={{ minWidth: `${100 / heroSlides.length}%` }}
              className={`flex-1 snap-start border-t-2 px-3 py-3 text-left transition sm:min-w-0 sm:px-4 sm:py-4 md:px-6 ${
                i === current
                  ? "border-gold bg-primary-dark"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-gold sm:text-xs">
                {s.tab}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}