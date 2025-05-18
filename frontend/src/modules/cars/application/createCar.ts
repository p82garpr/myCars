import { Car } from '../domain/Car';
import { CarRepository } from '../domain/CarRepository';

export async function createCar(repository: CarRepository, car: Car): Promise<Car> {
  return await repository.create(car);
} 