package com.example.MyCars.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.MyCars.models.CarModel;
import com.example.MyCars.models.CarPhotoModel;
import com.example.MyCars.repositories.CarPhotoRepository;

@Service
public class CarPhotoService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Autowired
    private CarPhotoRepository carPhotoRepository;

    public List<CarPhotoModel> getPhotosByCar(CarModel car) {
        return carPhotoRepository.findByCar(car);
    }

    public CarPhotoModel getMainPhoto(CarModel car) {
        return carPhotoRepository.findByCarAndIsMainTrue(car);
    }

    public CarPhotoModel savePhoto(MultipartFile file, CarModel car, String caption, Boolean isMain) throws IOException {
        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        
        // Guardar archivo
        Files.copy(file.getInputStream(), filePath);

        // Crear y guardar registro en base de datos
        CarPhotoModel photo = new CarPhotoModel();
        photo.setCar(car);
        photo.setUrl("/uploads/cars/" + fileName);
        photo.setCaption(caption);
        photo.setIsMain(isMain);

        // Si esta foto es principal, desmarcar las otras
        if (isMain) {
            List<CarPhotoModel> existingPhotos = getPhotosByCar(car);
            existingPhotos.forEach(p -> {
                if (!p.getId().equals(photo.getId())) {
                    p.setIsMain(false);
                    carPhotoRepository.save(p);
                }
            });
        }

        return carPhotoRepository.save(photo);
    }

    public void deletePhoto(Long id) throws IOException {
        CarPhotoModel photo = carPhotoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Foto no encontrada"));

        // Eliminar archivo físico
        String fileName = photo.getUrl().substring(photo.getUrl().lastIndexOf("/") + 1);
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        Files.deleteIfExists(filePath);

        // Eliminar registro de base de datos
        carPhotoRepository.deleteById(id);
    }
} 