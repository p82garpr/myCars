package com.example.MyCars.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MyCars.models.BrandModel;
import com.example.MyCars.models.ModelModel;
import com.example.MyCars.repositories.ModelRepository;

@Service
public class ModelService {

    @Autowired
    private ModelRepository modelRepository;
    
    public List<ModelModel> getAllModels() {
        return modelRepository.findAll();
    }
    
    public Optional<ModelModel> getModelById(Long id) {
        return modelRepository.findById(id);
    }
    
    public List<ModelModel> getModelsByBrand(BrandModel brand) {
        return modelRepository.findByBrand(brand);
    }
    
    public ModelModel saveModel(ModelModel model) {
        return modelRepository.save(model);
    }
    
    public void deleteModel(Long id) {
        modelRepository.deleteById(id);
    }
} 