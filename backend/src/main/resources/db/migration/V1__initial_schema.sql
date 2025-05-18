-- Crear tabla de marcas
CREATE TABLE IF NOT EXISTS brands (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de modelos
CREATE TABLE IF NOT EXISTS models (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_id BIGINT NOT NULL REFERENCES brands(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_model_brand FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Crear tabla de coches
CREATE TABLE IF NOT EXISTS cars (
    id BIGSERIAL PRIMARY KEY,
    model_id BIGINT NOT NULL,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    color VARCHAR(50) NOT NULL,
    expedition_year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    description TEXT,
    created_on DATE NOT NULL,
    CONSTRAINT fk_car_model FOREIGN KEY (model_id) REFERENCES models(id)
);

-- Crear tabla de fotos de coches
CREATE TABLE IF NOT EXISTS car_photos (
    id BIGSERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    car_id BIGINT NOT NULL,
    caption VARCHAR(255),
    is_main BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_car_photos_car FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
); 