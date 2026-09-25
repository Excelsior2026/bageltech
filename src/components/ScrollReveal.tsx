"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades content in as it scrolls into view.
 *
 * Content is always visible in the server-rendered HTML. Only elements that
 * start below the fold are hidden (after hydration) and then revealed, so
 * nothing on screen at load waits for JavaScript.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const show = () => {
      element.style.opacity = "";
      element.style.transform = "";
    };

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
        show();
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      show();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
