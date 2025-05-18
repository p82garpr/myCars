'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL, fetchConfig } from '@/config/api';
import { useForm } from 'react-hook-form';
import { CarPhotoUploader } from './CarPhotoUploader';
import { Car, Brand, Model } from '@/modules/cars/domain/Car';

interface CarFormProps {
  onSubmit: (car: Car, photos: { files: File[], mainPhotoIndex: number }) => Promise<void>;
  initialData?: Car;
  onClose: () => void;
}

const currentYear = new Date().getFullYear();

export const CarForm: React.FC<CarFormProps> = ({ onSubmit, initialData, onClose }) => {
  const { register } = useForm({ defaultValues: initialData });
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [newBrand, setNewBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [newModel, setNewModel] = useState<string>('');
  const [isNewBrand, setIsNewBrand] = useState<boolean>(false);
  const [isNewModel, setIsNewModel] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<{ files: File[], mainPhotoIndex: number }>({ files: [], mainPhotoIndex: -1 });
  const [formData, setFormData] = useState<Omit<Car, 'model'>>({
    licensePlate: '',
    color: '',
    expeditionYear: currentYear,
    mileage: 0,
    sellingPrice: 0,
    status: 'AVAILABLE',
    description: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand && !isNewBrand) {
      fetchModels(Number(selectedBrand));
    }
  }, [selectedBrand, isNewBrand]);

  useEffect(() => {
    // Activar la animación después de montar el componente
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`, fetchConfig);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchModels = async (brandId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/models/brand/${brandId}`, fetchConfig);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handlePhotosSelected = (files: File[], mainPhotoIndex: number) => {
    setSelectedPhotos({ files, mainPhotoIndex });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      let modelId: number;

      // Si es una nueva marca, crearla primero
      if (isNewBrand) {
        const brandResponse = await fetch('http://localhost:8080/brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newBrand })
        });
        const brandData = await brandResponse.json();
        
        // Crear el modelo para la nueva marca
        const modelResponse = await fetch('http://localhost:8080/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newModel,
            brand: { id: brandData.id }
          })
        });
        const modelData = await modelResponse.json();
        modelId = modelData.id;
      } else if (isNewModel) {
        // Crear nuevo modelo para una marca existente
        const modelResponse = await fetch('http://localhost:8080/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newModel,
            brand: { id: Number(selectedBrand) }
          })
        });
        const modelData = await modelResponse.json();
        modelId = modelData.id;
      } else {
        modelId = Number(selectedModel);
      }

      // Crear el coche con el modelo seleccionado o creado
      const carData: Car = {
        ...formData,
        model: {
          id: modelId,
          name: isNewModel ? newModel : models.find(m => m.id === modelId)?.name || '',
          brand: {
            id: isNewBrand ? Number(selectedBrand) : Number(selectedBrand),
            name: isNewBrand ? newBrand : brands.find(b => b.id === Number(selectedBrand))?.name || ''
          }
        }
      };

      await onSubmit(carData, selectedPhotos);
    } catch (error) {
      console.error('Error creating car:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Añadir Nuevo Vehículo</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Marca y Modelo */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      required
                      disabled={isNewBrand}
                    >
                      <option value="">Selecciona una marca</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </select>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newBrand"
                        checked={isNewBrand}
                        onChange={(e) => {
                          setIsNewBrand(e.target.checked);
                          if (e.target.checked) {
                            setSelectedBrand('');
                            setModels([]);
                          }
                        }}
                        className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="newBrand" className="ml-2 text-sm text-gray-600">
                        Nueva
                      </label>
                    </div>
                  </div>
                  {isNewBrand && (
                    <input
                      type="text"
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                      placeholder="Nombre de la nueva marca"
                      className="mt-2 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      required
                      disabled={!selectedBrand || isNewBrand || isNewModel}
                    >
                      <option value="">Selecciona un modelo</option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                      ))}
                    </select>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newModel"
                        checked={isNewModel}
                        onChange={(e) => {
                          setIsNewModel(e.target.checked);
                          if (e.target.checked) {
                            setSelectedModel('');
                          }
                        }}
                        className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="newModel" className="ml-2 text-sm text-gray-600">
                        Nuevo
                      </label>
                    </div>
                  </div>
                  {isNewModel && (
                    <input
                      type="text"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      placeholder="Nombre del nuevo modelo"
                      className="mt-2 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Detalles básicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matrícula
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="1234ABC"
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Negro"
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año
                </label>
                <input
                  type="number"
                  name="expeditionYear"
                  value={formData.expeditionYear}
                  onChange={handleInputChange}
                  min={1900}
                  max={currentYear}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kilometraje
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 pr-12"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 pr-8"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="AVAILABLE">Disponible</option>
                  <option value="RESERVED">Reservado</option>
                  <option value="SOLD">Vendido</option>
                  <option value="MAINTENANCE">En Mantenimiento</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe el vehículo en detalle..."
              />
            </div>

            {/* Fotos */}
            <div>
              <CarPhotoUploader onPhotosSelected={handlePhotosSelected} />
            </div>
          </form>
        </div>

        {/* Footer con botones */}
        <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 bg-white shadow-md flex justify-end space-x-3 rounded-b-2xl">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-neutral-900 border border-transparent rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center shadow-sm transition-colors"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Guardar Vehículo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 