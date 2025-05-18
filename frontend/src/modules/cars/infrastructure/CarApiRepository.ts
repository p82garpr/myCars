import { Car } from "../domain/Car"; // Importa desde el dominio
import { CarRepository } from "../domain/CarRepository";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class CarApiRepository implements CarRepository {
  private readonly API_URL = API_BASE_URL;

  async getAll(): Promise<Car[]> {
    try {
      const response = await fetch(`${this.API_URL}/cars`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  async create(car: Car): Promise<Car> {
    try {
      const response = await fetch(`${this.API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(car),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  // Puedes añadir implementaciones para otros métodos de CarRepository aquí
} 