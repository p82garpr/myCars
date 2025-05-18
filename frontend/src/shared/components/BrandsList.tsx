'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Brand } from '@/modules/cars/domain/Car';

interface BrandsListProps {
  brands: Brand[];
}

export const BrandsList: React.FC<BrandsListProps> = ({ brands: initialBrands }) => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBrands(initialBrands);
  }, [initialBrands]);

  useEffect(() => {
    if (brands.length === 0) {
      fetchBrands();
    }
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/brands');
      if (!response.ok) {
        throw new Error('Error al cargar las marcas');
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      setError('Error al cargar las marcas. Por favor, intenta de nuevo más tarde.');
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (brandName: string) => {
    // Convertir el nombre de la marca a un formato adecuado para el nombre de archivo
    const formattedName = brandName.toLowerCase()
      .replace(/-/g, '') // Eliminar guiones
      .replace(/\s+/g, '') // Eliminar espacios
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
    
    return `/brands/${formattedName}.png`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestras Marcas
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Descubre nuestra selección de las mejores marcas del mercado automovilístico
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.id} className="group cursor-pointer animate-fadeIn">
              <div className="aspect-square relative mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-neutral-100/0 group-hover:bg-neutral-100/50 rounded-full transition-colors duration-300" />
                <Image
                  src={getImageUrl(brand.name)}
                  alt={`Logo de ${brand.name}`}
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-all duration-300 ease-out"
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = '/brands/placeholder.svg';
                  }}
                />
              </div>
              <h2 className="text-lg font-medium text-center text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 