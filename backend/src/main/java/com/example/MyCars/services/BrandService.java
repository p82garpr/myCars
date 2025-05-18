package com.example.MyCars.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MyCars.models.BrandModel;
import com.example.MyCars.repositories.BrandRepository;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;
    
    public List<BrandModel> getAllBrands() {
        return brandRepository.findAll();
    }
    
    public Optional<BrandModel> getBrandById(Long id) {
        return brandRepository.findById(id);
    }
    
    public BrandModel saveBrand(BrandModel brand) {
        return brandRepository.save(brand);
    }
    
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
} 