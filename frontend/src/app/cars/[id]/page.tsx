'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/modules/cars/domain/Car';
import { API_BASE_URL } from '@/config/api';
import { formatPrice, translateStatus, getStatusColor } from '@/modules/cars/utils/carUtils';
// Importar Swiper
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Estilos personalizados para Swiper
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    color: #000000;
  }

  .swiper-pagination-bullet {
    background: #000000;
  }

  .swiper-pagination-bullet-active {
    background: #000000;
  }
`;

interface CarDetailsPageProps {
  params: {
    id: string;
  };
}

export default function CarDetailsPage({ params }: CarDetailsPageProps) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars/${params.id}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del vehículo');
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los detalles');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p className="font-medium">Error</p>
          <p>{error || 'No se encontró el vehículo'}</p>
          <Link href="/cars" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <style jsx global>{swiperStyles}</style>
      {/* Botón Volver */}
      <Link
        href="/cars"
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Volver al catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de Fotos */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            {car.photos && car.photos.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className="h-full w-full rounded-xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {car.photos.map((photo, index) => (
                  <SwiperSlide key={photo.id}>
                    <Image
                      src={photo.url.startsWith('http') ? photo.url : `${API_BASE_URL}${photo.url}`}
                      alt={`${car.model.brand.name} ${car.model.name} - Foto ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {car.photos && car.photos.length > 1 && (
            <div className="grid grid-cols-6 gap-2">
              {car.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideTo(index);
                    }
                  }}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary-400"
                >
                  <Image
                    src={photo.url.startsWith('http') ? photo.url : `${API_BASE_URL}${photo.url}`}
                    alt={`${car.model.brand.name} ${car.model.name} - Foto ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 16vw, 8vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del Vehículo */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">
              {car.model.brand.name} {car.model.name}
            </h1>
            <p className="text-xl text-neutral-600">{car.expeditionYear}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(car.status)}`}>
              {translateStatus(car.status)}
            </span>
            <p className="text-3xl font-bold text-primary-600">
              {formatPrice(car.sellingPrice)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-100">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="text-sm text-neutral-500">Kilometraje</p>
                <p className="font-semibold text-neutral-900">{car.mileage?.toLocaleString('es-ES')} km</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <div>
                <p className="text-sm text-neutral-500">Color</p>
                <p className="font-semibold text-neutral-900 capitalize">{car.color}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              <div>
                <p className="text-sm text-neutral-500">Matrícula</p>
                <p className="font-semibold text-neutral-900">{car.licensePlate}</p>
              </div>
            </div>
          </div>

          {car.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-neutral-600 whitespace-pre-line">{car.description}</p>
            </div>
          )}

          {/* Botón de Contacto */}
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Contactar sobre este vehículo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 