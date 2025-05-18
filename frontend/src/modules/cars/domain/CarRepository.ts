import { Car } from './Car';

export interface CarRepository {
  getAll(): Promise<Car[]>;
  create(car: Car): Promise<Car>;
  // Puedes añadir otros métodos aquí como getById, update, delete
} 