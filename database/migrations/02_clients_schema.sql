CREATE TABLE `Clients` (
    `Id` BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    `TenantId` BINARY(16) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `ContactName` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NULL,
    `Phone` VARCHAR(20) NULL,
    `Industry` VARCHAR(100) NULL,
    `Status` VARCHAR(50) NOT NULL DEFAULT 'Active',
    `TotalRevenue` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `ActiveProjectsCount` INT NOT NULL DEFAULT 0,
    `Address` VARCHAR(500) NULL,
    `City` VARCHAR(100) NULL,
    `State` VARCHAR(100) NULL,
    `ZipCode` VARCHAR(20) NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `CreatedBy` BINARY(16) NOT NULL,
    `UpdatedBy` BINARY(16) NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT FALSE,
    `Version` INT NOT NULL DEFAULT 1
);

CREATE INDEX `IX_Clients_TenantId` ON `Clients`(`TenantId`);
CREATE INDEX `IX_Clients_Status` ON `Clients`(`Status`);
CREATE INDEX `IX_Clients_Name` ON `Clients`(`Name`);

ALTER TABLE `Projects` ADD CONSTRAINT `FK_Projects_Clients` 
FOREIGN KEY (`ClientId`) REFERENCES `Clients`(`Id`) ON DELETE RESTRICT;
