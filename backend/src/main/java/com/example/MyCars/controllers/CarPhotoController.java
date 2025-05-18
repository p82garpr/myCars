package com.example.MyCars.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.MyCars.models.CarModel;
import com.example.MyCars.models.CarPhotoModel;
import com.example.MyCars.services.CarPhotoService;
import com.example.MyCars.services.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarPhotoController {

    @Autowired
    private CarPhotoService carPhotoService;

    @Autowired
    private CarService carService;

    @GetMapping("/{carId}/photos")
    public ResponseEntity<List<CarPhotoModel>> getCarPhotos(@PathVariable Long carId) {
        CarModel car = carService.getCarById(carId);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(carPhotoService.getPhotosByCar(car));
    }

    @GetMapping("/{carId}/photos/main")
    public ResponseEntity<CarPhotoModel> getMainPhoto(@PathVariable Long carId) {
        CarModel car = carService.getCarById(carId);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        CarPhotoModel mainPhoto = carPhotoService.getMainPhoto(car);
        return mainPhoto != null ? ResponseEntity.ok(mainPhoto) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{carId}/photos")
    public ResponseEntity<CarPhotoModel> uploadPhoto(
            @PathVariable Long carId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "caption", required = false) String caption,
            @RequestParam(value = "isMain", defaultValue = "false") Boolean isMain) {
        try {
            CarModel car = carService.getCarById(carId);
            if (car == null) {
                return ResponseEntity.notFound().build();
            }
            CarPhotoModel photo = carPhotoService.savePhoto(file, car, caption, isMain);
            return ResponseEntity.ok(photo);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/photos/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        try {
            carPhotoService.deletePhoto(photoId);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 