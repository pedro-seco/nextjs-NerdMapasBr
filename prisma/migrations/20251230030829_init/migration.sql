/*
  Warnings:

  - You are about to drop the column `mapaId` on the `POIs` table. All the data in the column will be lost.
  - Added the required column `mapId` to the `POIs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_POIs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "lat" INTEGER NOT NULL,
    "long" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    CONSTRAINT "POIs_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Mapas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_POIs" ("id", "lat", "long", "titulo") SELECT "id", "lat", "long", "titulo" FROM "POIs";
DROP TABLE "POIs";
ALTER TABLE "new_POIs" RENAME TO "POIs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
