package com.example.MyCars.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyCars.models.CarModel;
import com.example.MyCars.models.CarPhotoModel;

@Repository
public interface CarPhotoRepository extends JpaRepository<CarPhotoModel, Long> {
    List<CarPhotoModel> findByCar(CarModel car);
    CarPhotoModel findByCarAndIsMainTrue(CarModel car);
} 