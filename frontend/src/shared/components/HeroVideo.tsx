'use client';

import { FC, ReactNode } from 'react';

interface HeroVideoProps {
  videoUrl: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}

export const HeroVideo: FC<HeroVideoProps> = ({ videoUrl, title, subtitle, children }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-8">
      {/* Video de fondo con overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {/* Contenido del hero */}
      <div className="relative z-20 text-center text-white space-y-8 max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold animate-slideIn">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 animate-fadeIn delay-200">
          {subtitle}
        </p>
        <div className="flex justify-center gap-6 pt-6 animate-fadeIn delay-300">
          {children}
        </div>
      </div>
    </section>
  );
}; 