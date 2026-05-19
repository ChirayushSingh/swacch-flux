-- CreateTable
CREATE TABLE "WastePrediction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "wardId" TEXT,
    "date" DATETIME NOT NULL,
    "predictedVolume" REAL NOT NULL,
    "confidence" REAL NOT NULL,
    "factors" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WastePrediction_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WastePrediction_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaintenanceLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "partsReplaced" TEXT,
    "odometer" REAL,
    "serviceDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MaintenanceLog_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceSchedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "nextServiceAt" DATETIME NOT NULL,
    "serviceType" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServiceSchedule_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "minThreshold" INTEGER NOT NULL DEFAULT 5,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InventoryItem_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationNo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "make" TEXT,
    "model" TEXT,
    "orgId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastPingAt" DATETIME,
    "lastLat" REAL,
    "lastLng" REAL,
    "deviceId" TEXT,
    "healthScore" REAL NOT NULL DEFAULT 100,
    "failureRisk" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Vehicle_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "GpsDevice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("createdAt", "deviceId", "id", "isDeleted", "lastLat", "lastLng", "lastPingAt", "make", "model", "orgId", "registrationNo", "status", "type", "updatedAt") SELECT "createdAt", "deviceId", "id", "isDeleted", "lastLat", "lastLng", "lastPingAt", "make", "model", "orgId", "registrationNo", "status", "type", "updatedAt" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_registrationNo_key" ON "Vehicle"("registrationNo");
CREATE UNIQUE INDEX "Vehicle_deviceId_key" ON "Vehicle"("deviceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
