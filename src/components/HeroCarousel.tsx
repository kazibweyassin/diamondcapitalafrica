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
    [isTransitioning]
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
      <div className="relative h-[480px] overflow-hidden md:h-[560px] lg:h-[620px]">
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isTransitioning
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-white/85 md:text-lg">
              {slide.description}
            </p>
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20 md:left-8"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={`flex-1 border-t-2 px-4 py-4 text-left transition md:px-6 ${
                i === current
                  ? "border-gold bg-primary-dark"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <span className="block text-xs font-medium uppercase tracking-wider text-gold">
                {s.tab}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}