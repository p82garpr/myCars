package com.example.MyCars.services;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MyCars.models.CarModel;
import com.example.MyCars.repositories.CarRepository;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public ArrayList<CarModel> getAllCars() {
        return (ArrayList<CarModel>) carRepository.findAllWithDetails();
    }

    public CarModel getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public CarModel createCar(CarModel car) {
        car.setCreatedOn(LocalDate.now());
        return carRepository.save(car);
    }

    public CarModel updateCar(CarModel car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
    
    

}
