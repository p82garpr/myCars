'use client';

import Image from 'next/image';
import { FC } from 'react';

interface Brand {
  name: string;
  logo: string;
  description: string;
}

interface BrandShowcaseProps {
  brands: Brand[];
}

export const BrandShowcase: FC<BrandShowcaseProps> = ({ brands }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Nuestras Marcas Premium
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="h-32 relative mb-6 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={`Logo de ${brand.name}`}
                width={160}
                height={80}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">{brand.name}</h3>
            <p className="text-neutral-600 text-center">{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 