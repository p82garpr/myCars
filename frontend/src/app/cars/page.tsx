'use client';

import { useState, useMemo } from 'react';
import { Dialog } from '@/shared/components/Dialog';
import { CarForm } from '@/shared/components/CarForm';
import { CarCard } from '../../modules/cars/ui/CarCard';
import { getAllCars } from '../../modules/cars/application/getAllCars';
import { createCar } from '../../modules/cars/application/createCar';
import { CarApiRepository } from '../../modules/cars/infrastructure/CarApiRepository';
import { Car } from '../../modules/cars/domain/Car';
import { useEffect, useCallback } from 'react';

export default function CarsPage() {
  const [showForm, setShowForm] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const carRepository = useMemo(() => new CarApiRepository(), []);

  const loadCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cars = await getAllCars(carRepository);
      setCars(cars);
    } catch (error) {
      setError('Error al cargar los coches');
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  }, [carRepository]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleCreateCar = async (carData: Car, photos: { files: File[], mainPhotoIndex: number }) => {
    try {
      // Crear el coche primero
      const createdCar = await createCar(carRepository, carData);

      // Si hay fotos, subirlas
      if (photos.files.length > 0) {
        const formData = new FormData();
        
        // Subir cada foto
        for (let i = 0; i < photos.files.length; i++) {
          formData.set('file', photos.files[i]);
          formData.set('isMain', (i === photos.mainPhotoIndex).toString());
          
          await fetch(`http://localhost:8080/api/cars/${createdCar.id}/photos`, {
            method: 'POST',
            body: formData
          });
        }
      }

      setShowForm(false);
      loadCars(); // Recargar la lista de coches
    } catch (error) {
      console.error('Error creating car:', error);
      setError('Error al crear el coche');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Gestión de Coches</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Añadir Coche
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      <Dialog
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Añadir Nuevo Coche"
        maxWidth="2xl"
      >
        <CarForm
          onSubmit={handleCreateCar}
          onClose={() => setShowForm(false)}
        />
      </Dialog>
    </div>
  );
} 