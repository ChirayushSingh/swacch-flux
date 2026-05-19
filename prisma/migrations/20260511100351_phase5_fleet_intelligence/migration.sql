-- CreateTable
CREATE TABLE "Vehicle" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Vehicle_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "GpsDevice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GpsDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imei" TEXT NOT NULL,
    "simNumber" TEXT,
    "protocol" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VehiclePing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "speed" REAL NOT NULL DEFAULT 0,
    "heading" REAL NOT NULL DEFAULT 0,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VehiclePing_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "type" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "geometry" TEXT NOT NULL,
    "wardId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Route_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Route_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RouteAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RouteAssignment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RouteAssignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RouteCoverage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "routeId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "plannedDistance" REAL NOT NULL,
    "actualDistance" REAL NOT NULL,
    "coveragePercent" REAL NOT NULL,
    "missedPoints" TEXT,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "penaltyApplied" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RouteCoverage_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PenaltyLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "details" TEXT,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PenaltyLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registrationNo_key" ON "Vehicle"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_deviceId_key" ON "Vehicle"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "GpsDevice_imei_key" ON "GpsDevice"("imei");

-- CreateIndex
CREATE INDEX "VehiclePing_vehicleId_timestamp_idx" ON "VehiclePing"("vehicleId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Route_code_key" ON "Route"("code");
