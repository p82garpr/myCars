import { Car } from "../domain/Car"; // Importa del dominio
import { CarRepository } from "../domain/CarRepository"; // Importa del dominio

export async function getAllCars(carRepository: CarRepository): Promise<Car[]> {
  // Aquí podría haber lógica de negocio adicional si fuera necesario
  // Por ahora, simplemente llamamos al método del repositorio
  return carRepository.getAll();
} 