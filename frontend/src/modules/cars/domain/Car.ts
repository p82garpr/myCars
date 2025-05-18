export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  brand: Brand;
}

export interface CarPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface Car {
  id?: string;
  model: Model;
  licensePlate: string;
  color: string;
  expeditionYear: number;
  mileage: number;
  sellingPrice: number;
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED' | 'MAINTENANCE';
  description?: string;
  createdOn?: string;
  photos?: CarPhoto[];
}

