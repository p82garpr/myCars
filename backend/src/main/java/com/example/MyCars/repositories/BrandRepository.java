package com.example.MyCars.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyCars.models.BrandModel;

@Repository
public interface BrandRepository extends JpaRepository<BrandModel, Long> {
} 