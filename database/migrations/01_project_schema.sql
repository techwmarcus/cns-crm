CREATE TABLE `Projects` (
    `Id` BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    `TenantId` BINARY(16) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT NULL,
    `ClientId` BINARY(16) NOT NULL,
    `ManagerId` BINARY(16) NOT NULL,
    `Status` VARCHAR(50) NOT NULL,
    `Health` VARCHAR(50) NOT NULL,
    `StartDate` DATE NULL,
    `ExpectedEndDate` DATE NULL,
    `ActualEndDate` DATE NULL,
    `TotalBudget` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `TotalSpent` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `Address` VARCHAR(500) NULL,
    `City` VARCHAR(100) NULL,
    `State` VARCHAR(100) NULL,
    `ZipCode` VARCHAR(20) NULL,
    `Coordinates` POINT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `CreatedBy` BINARY(16) NOT NULL,
    `UpdatedBy` BINARY(16) NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT FALSE,
    `Version` INT NOT NULL DEFAULT 1
);

CREATE INDEX `IX_Projects_TenantId` ON `Projects`(`TenantId`);
CREATE INDEX `IX_Projects_ClientId` ON `Projects`(`ClientId`);
CREATE INDEX `IX_Projects_ManagerId` ON `Projects`(`ManagerId`);
CREATE INDEX `IX_Projects_Status` ON `Projects`(`Status`);

CREATE TABLE `ProjectMilestones` (
    `Id` BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    `ProjectId` BINARY(16) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT NULL,
    `DueDate` DATE NOT NULL,
    `CompletionDate` DATE NULL,
    `Status` VARCHAR(50) NOT NULL,
    `OrderIndex` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `CreatedBy` BINARY(16) NOT NULL,
    `UpdatedBy` BINARY(16) NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (`ProjectId`) REFERENCES `Projects`(`Id`) ON DELETE CASCADE
);

CREATE INDEX `IX_Milestones_ProjectId` ON `ProjectMilestones`(`ProjectId`);