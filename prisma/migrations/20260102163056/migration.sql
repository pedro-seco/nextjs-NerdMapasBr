/*
  Warnings:

  - You are about to drop the column `lat` on the `POIs` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `POIs` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Mapas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Mapas` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Mapas` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `latitude` to the `POIs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `POIs` table without a default value. This is not possible if the table is not empty.
  - Made the column `titulo` on table `POIs` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mapas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "fronteira" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Mapas" ("id", "name") SELECT "id", "name" FROM "Mapas";
DROP TABLE "Mapas";
ALTER TABLE "new_Mapas" RENAME TO "Mapas";
CREATE TABLE "new_POIs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    CONSTRAINT "POIs_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Mapas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_POIs" ("id", "mapId", "titulo") SELECT "id", "mapId", "titulo" FROM "POIs";
DROP TABLE "POIs";
ALTER TABLE "new_POIs" RENAME TO "POIs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
