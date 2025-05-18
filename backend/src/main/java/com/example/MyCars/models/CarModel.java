package com.example.MyCars.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="cars")
public class CarModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String licensePlate;
    
    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    @JsonIgnoreProperties({"cars"})
    private ModelModel model;
    
    private CarStatus status;
    private String color;

    @Column(name = "expedition_year")
    private Integer expeditionYear;
    private Integer mileage;

    private BigDecimal sellingPrice;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "car")
    @JsonIgnoreProperties("car")
    private List<CarPhotoModel> photos;

}
