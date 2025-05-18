'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fade-up' | 'scale';
  delay?: number;
}

export const ScrollAnimation: FC<ScrollAnimationProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={animation === 'fade-up' ? 'animate-on-scroll' : 'scale-on-scroll'}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}; 