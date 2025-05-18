package com.example.MyCars.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.MyCars.models.CarModel;

@Repository
public interface CarRepository extends CrudRepository<CarModel, Long> {
    
    @Query("SELECT c FROM CarModel c JOIN FETCH c.model m JOIN FETCH m.brand")
    List<CarModel> findAllWithDetails();
}
