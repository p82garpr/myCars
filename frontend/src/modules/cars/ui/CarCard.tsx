import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Usar ruta relativa si el alias @/ no funciona consistentemente en tu entorno
import { Car } from "../domain/Car"; // Importa la entidad Car
import { formatPrice, translateStatus, getStatusColor } from '../utils/carUtils';
import { API_BASE_URL } from '@/config/api';

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const router = useRouter();

  // Asegurarse de que 'car', 'car.model', y 'car.model.brand' existen antes de acceder a las propiedades
  if (!car || !car.model || !car.model.brand) {
    console.error("Invalid car data received by CarCard:", car);
    return (
      <div className="p-4 bg-primary-50 text-primary-800 rounded-lg border border-primary-200">
        Datos de vehículo inválidos.
      </div>
    );
  }

  const mainPhoto = car.photos?.find(photo => photo.isMain);

  const handleViewDetails = () => {
    router.push(`/cars/${car.id}`);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-neutral-200/50 hover:border-primary-200">
      {/* Imagen y overlay con marca */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {mainPhoto ? (
          <>
            <Image
              src={mainPhoto.url.startsWith('http') ? mainPhoto.url : `${API_BASE_URL}${mainPhoto.url}`}
              alt={`${car.model.brand.name} ${car.model.name}`}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
            <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Badge de marca */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
          <p className="text-sm font-medium text-white">
            {car.model.brand.name}
          </p>
        </div>

        {/* Badge de estado */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(car.status)} backdrop-blur-sm`}>
            {translateStatus(car.status)}
          </span>
        </div>
      </div>

      {/* Información del coche */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Modelo y año */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {car.model.name}
            </h3>
            <p className="text-neutral-500 font-medium">{car.expeditionYear}</p>
          </div>

          {/* Especificaciones */}
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
          </div>

          {/* Precio y botón */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Precio</p>
              <p className="text-2xl font-bold text-primary-600">
                {typeof car.sellingPrice === 'number' 
                  ? formatPrice(car.sellingPrice)
                  : 'Precio no disponible'}
              </p>
            </div>
            <button 
              onClick={handleViewDetails}
              className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-lg 
                           hover:bg-primary-600 transition-colors duration-300
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <span>Ver Detalles</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 