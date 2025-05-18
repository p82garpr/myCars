export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  brand: Brand;
}

export interface Car {
  id?: number;
  licensePlate: string;
  model: Model;
  status: CarStatus;
  color: string;
  expeditionYear: number;
  mileage: number;
  sellingPrice: number;
  createdOn?: string;
} 