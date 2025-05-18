package com.example.MyCars.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyCars.models.ModelModel;
import com.example.MyCars.services.BrandService;
import com.example.MyCars.services.ModelService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/models")
@Tag(name = "Models", description = "API para gestionar modelos de vehículos")
public class ModelController {

    @Autowired
    private ModelService modelService;
    
    @Autowired
    private BrandService brandService;
    
    @Operation(summary = "Obtener todos los modelos", description = "Retorna una lista de todos los modelos disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de modelos obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<ModelModel>> getAllModels() {
        return ResponseEntity.ok(modelService.getAllModels());
    }
    
    @Operation(summary = "Obtener un modelo por ID", description = "Retorna un modelo basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Modelo encontrado"),
        @ApiResponse(responseCode = "404", description = "Modelo no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ModelModel> getModelById(
        @Parameter(description = "ID del modelo", required = true) @PathVariable Long id) {
        return modelService.getModelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Obtener modelos por marca", description = "Retorna una lista de modelos que pertenecen a una marca específica")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de modelos obtenida correctamente"),
        @ApiResponse(responseCode = "404", description = "Marca no encontrada")
    })
    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<ModelModel>> getModelsByBrand(
        @Parameter(description = "ID de la marca", required = true) @PathVariable Long brandId) {
        return brandService.getBrandById(brandId)
                .map(brand -> ResponseEntity.ok(modelService.getModelsByBrand(brand)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Crear un nuevo modelo", description = "Crea un nuevo modelo en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Modelo creado correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos del modelo inválidos")
    })
    @PostMapping
    public ResponseEntity<ModelModel> createModel(
        @Parameter(description = "Datos del modelo", required = true) @RequestBody ModelModel model) {
        ModelModel savedModel = modelService.saveModel(model);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedModel);
    }
    
    @Operation(summary = "Actualizar un modelo", description = "Actualiza los datos de un modelo existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Modelo actualizado correctamente"),
        @ApiResponse(responseCode = "404", description = "Modelo no encontrado"),
        @ApiResponse(responseCode = "400", description = "Datos del modelo inválidos")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ModelModel> updateModel(
        @Parameter(description = "ID del modelo", required = true) @PathVariable Long id,
        @Parameter(description = "Nuevos datos del modelo", required = true) @RequestBody ModelModel model) {
        return modelService.getModelById(id)
                .map(existingModel -> {
                    model.setId(id);
                    return ResponseEntity.ok(modelService.saveModel(model));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Eliminar un modelo", description = "Elimina un modelo del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Modelo eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "Modelo no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(
        @Parameter(description = "ID del modelo", required = true) @PathVariable Long id) {
        return modelService.getModelById(id)
                .map(model -> {
                    modelService.deleteModel(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 