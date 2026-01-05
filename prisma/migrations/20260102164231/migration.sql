/*
  Warnings:

  - You are about to drop the `Mapas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `titulo` on the `POIs` table. All the data in the column will be lost.
  - Added the required column `name` to the `POIs` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mapas";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "borders" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_POIs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    CONSTRAINT "POIs_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_POIs" ("id", "latitude", "longitude", "mapId") SELECT "id", "latitude", "longitude", "mapId" FROM "POIs";
DROP TABLE "POIs";
ALTER TABLE "new_POIs" RENAME TO "POIs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
