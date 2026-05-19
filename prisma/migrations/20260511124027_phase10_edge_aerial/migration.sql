-- CreateTable
CREATE TABLE "DroneFlight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "flightCode" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "pathGeometry" TEXT,
    "coverageArea" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "batteryLevel" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DroneFlight_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AerialHotspot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "estimatedVolume" REAL NOT NULL,
    "confidence" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DETECTED',
    "detectionType" TEXT NOT NULL DEFAULT 'DRONE',
    "imagePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AerialHotspot_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EdgeAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "wasteType" TEXT NOT NULL,
    "weightEstimate" REAL,
    "confidence" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EdgeAudit_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SmartBin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "wardId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "fillLevel" REAL NOT NULL DEFAULT 0,
    "battery" REAL,
    "lastPingAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SmartBin_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SmartBin_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DroneFlight_flightCode_key" ON "DroneFlight"("flightCode");

-- CreateIndex
CREATE UNIQUE INDEX "SmartBin_code_key" ON "SmartBin"("code");
