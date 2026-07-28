-- Database: ConstructionCRM_Projects
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Projects" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "TenantId" UUID NOT NULL, -- For Multi-tenancy / Organizations
    "Name" VARCHAR(255) NOT NULL,
    "Description" TEXT NULL,
    "ClientId" UUID NOT NULL,
    "ManagerId" UUID NOT NULL,
    "Status" VARCHAR(50) NOT NULL, -- Planning, Active, Delayed, Completed
    "Health" VARCHAR(50) NOT NULL, -- Good, AtRisk, Critical
    "StartDate" DATE NULL,
    "ExpectedEndDate" DATE NULL,
    "ActualEndDate" DATE NULL,
    "TotalBudget" DECIMAL(18, 2) NOT NULL DEFAULT 0,
    "TotalSpent" DECIMAL(18, 2) NOT NULL DEFAULT 0,
    "Address" VARCHAR(500) NULL,
    "City" VARCHAR(100) NULL,
    "State" VARCHAR(100) NULL,
    "ZipCode" VARCHAR(20) NULL,
    "Coordinates" POINT NULL, -- For map/GPS visualization
    
    -- Audit fields
    "CreatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE NULL,
    "CreatedBy" UUID NOT NULL,
    "UpdatedBy" UUID NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "Version" INT NOT NULL DEFAULT 1
);

CREATE INDEX "IX_Projects_TenantId" ON "Projects"("TenantId");
CREATE INDEX "IX_Projects_ClientId" ON "Projects"("ClientId");
CREATE INDEX "IX_Projects_ManagerId" ON "Projects"("ManagerId");
CREATE INDEX "IX_Projects_Status" ON "Projects"("Status");

CREATE TABLE "ProjectMilestones" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ProjectId" UUID NOT NULL REFERENCES "Projects"("Id") ON DELETE CASCADE,
    "Name" VARCHAR(255) NOT NULL,
    "Description" TEXT NULL,
    "DueDate" DATE NOT NULL,
    "CompletionDate" DATE NULL,
    "Status" VARCHAR(50) NOT NULL,
    "OrderIndex" INT NOT NULL,
    
    "CreatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP WITH TIME ZONE NULL,
    "CreatedBy" UUID NOT NULL,
    "UpdatedBy" UUID NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX "IX_Milestones_ProjectId" ON "ProjectMilestones"("ProjectId");
