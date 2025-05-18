package com.example.MyCars.controllers;

import java.time.LocalDate;
import java.util.ArrayList;

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

import com.example.MyCars.models.CarModel;
import com.example.MyCars.services.CarService;
import com.example.MyCars.services.CarPhotoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("cars")
@Tag(name = "Cars", description = "API para gestionar vehículos")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private CarPhotoService carPhotoService;

    @Operation(summary = "Obtener todos los vehículos", description = "Retorna una lista de todos los vehículos disponibles")
    @ApiResponse(responseCode = "200", description = "Lista de vehículos obtenida correctamente")
    @GetMapping
    public ArrayList<CarModel> getCars() {
        return carService.getAllCars();
    }

    @Operation(summary = "Obtener un vehículo por ID", description = "Retorna un vehículo basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vehículo encontrado"),
        @ApiResponse(responseCode = "404", description = "Vehículo no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<CarModel> getCarById(
        @Parameter(description = "ID del vehículo", required = true) @PathVariable Long id) {
        CarModel car = carService.getCarById(id);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(car);
    }

    @Operation(summary = "Crear un nuevo vehículo", description = "Crea un nuevo vehículo en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Vehículo creado correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos del vehículo inválidos")
    })
    @PostMapping
    public ResponseEntity<CarModel> saveCar(
        @Parameter(description = "Datos del vehículo", required = true) @RequestBody CarModel car) {
        car.setCreatedOn(LocalDate.now());
        CarModel savedCar = carService.createCar(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
    }

    @Operation(summary = "Actualizar un vehículo", description = "Actualiza los datos de un vehículo existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vehículo actualizado correctamente"),
        @ApiResponse(responseCode = "404", description = "Vehículo no encontrado"),
        @ApiResponse(responseCode = "400", description = "Datos del vehículo inválidos")
    })
    @PutMapping("/{id}")
    public ResponseEntity<CarModel> updateCar(
        @Parameter(description = "ID del vehículo", required = true) @PathVariable Long id,
        @Parameter(description = "Nuevos datos del vehículo", required = true) @RequestBody CarModel car) {
        CarModel existingCar = carService.getCarById(id);
        if (existingCar == null) {
            return ResponseEntity.notFound().build();
        }
        car.setId(id);
        return ResponseEntity.ok(carService.updateCar(car));
    }
    
    @Operation(summary = "Eliminar un vehículo", description = "Elimina un vehículo del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Vehículo eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "Vehículo no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(
        @Parameter(description = "ID del vehículo", required = true) @PathVariable Long id) {
        CarModel car = carService.getCarById(id);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }
}
