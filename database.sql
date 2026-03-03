CREATE DATABASE nord_hotel CHARACTER SET utf8mb4;
USE nord_hotel;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(15) NOT NULL,
    total_rooms INT NOT NULL
);

INSERT INTO rooms(type, total_rooms) VALUES 
    ('Economy', 10),
    ('Comfort', 8),
    ('Luxurious', 5),
    ('Apartment', 2);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(25),
    email VARCHAR(50),
    room VARCHAR(15),
    check_in DATE,
    check_out DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    email VARCHAR(50),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);