'use client';

import { useState, useEffect } from 'react';
import { Car, Brand, Model } from '../domain/Car';
import { validateSpanishLicensePlate } from '../utils/carUtils';

interface CarFormProps {
  onSubmit: (carData: Car) => void;
}

const currentYear = new Date().getFullYear();
const statusOptions = [
  { value: 'AVAILABLE' as const, label: 'Disponible' },
  { value: 'SOLD' as const, label: 'Vendido' },
  { value: 'RESERVED' as const, label: 'Reservado' },
  { value: 'MAINTENANCE' as const, label: 'En Mantenimiento' }
];

export function CarForm({ onSubmit }: CarFormProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [newBrand, setNewBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [newModel, setNewModel] = useState<string>('');
  const [isNewBrand, setIsNewBrand] = useState<boolean>(false);
  const [isNewModel, setIsNewModel] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    licensePlate: '',
    color: '',
    expeditionYear: currentYear,
    mileage: 0,
    sellingPrice: 0,
    status: 'AVAILABLE' as const
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand && !isNewBrand) {
      fetchModels(Number(selectedBrand));
    }
  }, [selectedBrand, isNewBrand]);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:8080/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setErrors(prev => ({
        ...prev,
        brand: 'Error al cargar las marcas'
      }));
    }
  };

  const fetchModels = async (brandId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/models/brand/${brandId}`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
      setErrors(prev => ({
        ...prev,
        model: 'Error al cargar los modelos'
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateSpanishLicensePlate(formData.licensePlate)) {
      newErrors.licensePlate = 'Matrícula inválida. Debe ser formato español (ej: 1234ABC o AB1234)';
    }

    if (!formData.color) {
      newErrors.color = 'El color es requerido';
    }

    if (formData.expeditionYear < 1900 || formData.expeditionYear > currentYear) {
      newErrors.expeditionYear = `El año debe estar entre 1900 y ${currentYear}`;
    }

    if (formData.mileage < 0) {
      newErrors.mileage = 'El kilometraje no puede ser negativo';
    }

    if (formData.sellingPrice <= 0) {
      newErrors.sellingPrice = 'El precio debe ser mayor que 0';
    }

    if (isNewBrand && !newBrand.trim()) {
      newErrors.brand = 'El nombre de la marca es requerido';
    }

    if (isNewModel && !newModel.trim()) {
      newErrors.model = 'El nombre del modelo es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === 'mileage' || name === 'sellingPrice') {
      parsedValue = value === '' ? 0 : Math.max(0, parseInt(value) || 0);
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));

    // Limpiar error cuando el usuario corrige el campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      let brandId: number;
      let modelId: number;

      if (isNewBrand) {
        const brandResponse = await fetch('http://localhost:8080/brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newBrand })
        });
        const brandData = await brandResponse.json();
        brandId = brandData.id;
      } else {
        brandId = Number(selectedBrand);
      }

      if (isNewModel) {
        const modelResponse = await fetch('http://localhost:8080/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newModel,
            brand: { id: brandId }
          })
        });
        const modelData = await modelResponse.json();
        modelId = modelData.id;
      } else {
        modelId = Number(selectedModel);
      }

      const carData: Car = {
        ...formData,
        id: '',
        model: {
          id: modelId,
          name: isNewModel ? newModel : models.find(m => m.id === modelId)?.name || '',
          brand: {
            id: brandId,
            name: isNewBrand ? newBrand : brands.find(b => b.id === brandId)?.name || ''
          }
        },
        createdOn: new Date().toISOString()
      };

      onSubmit(carData);
    } catch (error) {
      console.error('Error creating car:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Error al crear el vehículo. Por favor, inténtalo de nuevo.'
      }));
    }
  };

  const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 font-medium";
  const labelClassName = "block text-sm font-medium text-gray-900";
  const errorClassName = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Sección de Marca */}
        <div className="space-y-2">
          <label className={labelClassName}>Marca</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isNewBrand}
              onChange={(e) => {
                setIsNewBrand(e.target.checked);
                if (e.target.checked) {
                  setSelectedBrand('');
                  setModels([]);
                }
              }}
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-900">Nueva marca</span>
          </div>
          {isNewBrand ? (
            <input
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="Nombre de la nueva marca"
              className={inputClassName}
            />
          ) : (
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={inputClassName}
            >
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          )}
          {errors.brand && <p className={errorClassName}>{errors.brand}</p>}
        </div>

        {/* Sección de Modelo */}
        <div className="space-y-2">
          <label className={labelClassName}>Modelo</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isNewModel}
              onChange={(e) => {
                setIsNewModel(e.target.checked);
                if (e.target.checked) {
                  setSelectedModel('');
                }
              }}
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-900">Nuevo modelo</span>
          </div>
          {isNewModel ? (
            <input
              type="text"
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
              placeholder="Nombre del nuevo modelo"
              className={inputClassName}
            />
          ) : (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={inputClassName}
              disabled={!selectedBrand || isNewBrand}
            >
              <option value="">Selecciona un modelo</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          )}
          {errors.model && <p className={errorClassName}>{errors.model}</p>}
        </div>

        {/* Otros campos del coche */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClassName}>
              Matrícula
            </label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              placeholder="1234ABC"
              className={inputClassName}
            />
            {errors.licensePlate && <p className={errorClassName}>{errors.licensePlate}</p>}
          </div>

          <div>
            <label className={labelClassName}>
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Negro"
              className={inputClassName}
            />
            {errors.color && <p className={errorClassName}>{errors.color}</p>}
          </div>

          <div>
            <label className={labelClassName}>
              Año
            </label>
            <input
              type="number"
              name="expeditionYear"
              value={formData.expeditionYear}
              onChange={handleInputChange}
              min="1900"
              max={currentYear}
              className={inputClassName}
            />
            {errors.expeditionYear && <p className={errorClassName}>{errors.expeditionYear}</p>}
          </div>

          <div>
            <label className={labelClassName}>
              Kilometraje
            </label>
            <div className="relative">
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                min="0"
                className={inputClassName}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">km</span>
            </div>
            {errors.mileage && <p className={errorClassName}>{errors.mileage}</p>}
          </div>

          <div>
            <label className={labelClassName}>
              Precio
            </label>
            <div className="relative">
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                min="0"
                className={inputClassName}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            </div>
            {errors.sellingPrice && <p className={errorClassName}>{errors.sellingPrice}</p>}
          </div>

          <div>
            <label className={labelClassName}>
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={inputClassName}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errors.submit}</span>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Vehículo
        </button>
      </div>
    </form>
  );
} 