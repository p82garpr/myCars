package com.example.MyCars.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyCars.models.BrandModel;
import com.example.MyCars.models.ModelModel;

@Repository
public interface ModelRepository extends JpaRepository<ModelModel, Long> {
    List<ModelModel> findByBrand(BrandModel brand);
} 