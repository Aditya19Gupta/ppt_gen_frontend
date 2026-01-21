import React, { useEffect, useState } from "react";

interface AnimatedSlideProps {
  children: React.ReactNode;
  slideIndex: number;
  delay?: number;
  className?: string;
}

export default function AnimatedSlide({
  children,
  slideIndex,
  delay = 0,
  className = "",
}: AnimatedSlideProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay + slideIndex * 100); // Stagger slides

    return () => clearTimeout(timer);
  }, [delay, slideIndex]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}


