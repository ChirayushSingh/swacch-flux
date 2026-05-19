-- CreateTable
CREATE TABLE "DispatchLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "dispatchMode" TEXT NOT NULL DEFAULT 'AUTO',
    "reasoning" TEXT,
    "proximity" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DispatchLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DispatchLog_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DispatchLog_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ESGReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "reportTitle" TEXT NOT NULL,
    "periodStart" DATETIME NOT NULL,
    "periodEnd" DATETIME NOT NULL,
    "carbonSaved" REAL NOT NULL,
    "socialScore" REAL NOT NULL,
    "governanceCompliance" REAL NOT NULL,
    "pdfPath" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ESGReport_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DispatchLog_complaintId_key" ON "DispatchLog"("complaintId");
