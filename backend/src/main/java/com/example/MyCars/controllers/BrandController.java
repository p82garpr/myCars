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

import com.example.MyCars.models.BrandModel;
import com.example.MyCars.services.BrandService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/brands")
@Tag(name = "Brands", description = "API para gestionar marcas de vehículos")
public class BrandController {

    @Autowired
    private BrandService brandService;
    
    @Operation(summary = "Obtener todas las marcas", description = "Retorna una lista de todas las marcas disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de marcas obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<BrandModel>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }
    
    @Operation(summary = "Obtener una marca por ID", description = "Retorna una marca basada en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Marca encontrada"),
        @ApiResponse(responseCode = "404", description = "Marca no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BrandModel> getBrandById(
        @Parameter(description = "ID de la marca", required = true) @PathVariable Long id) {
        return brandService.getBrandById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Crear una nueva marca", description = "Crea una nueva marca en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Marca creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos de la marca inválidos")
    })
    @PostMapping
    public ResponseEntity<BrandModel> createBrand(
        @Parameter(description = "Datos de la marca", required = true) @RequestBody BrandModel brand) {
        BrandModel savedBrand = brandService.saveBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBrand);
    }
    
    @Operation(summary = "Actualizar una marca", description = "Actualiza los datos de una marca existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Marca actualizada correctamente"),
        @ApiResponse(responseCode = "404", description = "Marca no encontrada"),
        @ApiResponse(responseCode = "400", description = "Datos de la marca inválidos")
    })
    @PutMapping("/{id}")
    public ResponseEntity<BrandModel> updateBrand(
        @Parameter(description = "ID de la marca", required = true) @PathVariable Long id,
        @Parameter(description = "Nuevos datos de la marca", required = true) @RequestBody BrandModel brand) {
        return brandService.getBrandById(id)
                .map(existingBrand -> {
                    brand.setId(id);
                    return ResponseEntity.ok(brandService.saveBrand(brand));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Eliminar una marca", description = "Elimina una marca del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Marca eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Marca no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(
        @Parameter(description = "ID de la marca", required = true) @PathVariable Long id) {
        return brandService.getBrandById(id)
                .map(brand -> {
                    brandService.deleteBrand(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 