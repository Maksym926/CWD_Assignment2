CREATE DATABASE IF NOT EXISTS appliance_inventory;
USE appliance_inventory;
CREATE TABLE IF NOT EXISTS User (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    Mobile VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Eircode VARCHAR(8) NOT NULL

);

CREATE TABLE IF NOT EXISTS Appliance(
    ApplianceID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    ApplianceType VARCHAR(50) NOT NULL,
    Brand VARCHAR(50) NOT NULL,
    ModelNumber VARCHAR(12) NOT NULL,
    SerialNumber VARCHAR(14) NOT NULL UNIQUE,
    PurchaseDate DATE NOT NULL,
    WarrantyExpirationDate DATE NOT NULL,
    CostOfAppliance DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY(UserId)
        REFERENCES users(UserId) ON DELETE CASCADE   

);