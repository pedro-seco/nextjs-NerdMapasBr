/*

Exemplo de criação de bancos feitos pelo PRISMA

Caso não fosse o SQLite e sim um banco mais tradicional, seria necessário antes de tudo:

CREATE DATABASE mapas;
USE mapas;

*/

PRAGMA foreign_keys = ON;

CREATE TABLE "Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "borders" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "POIs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "mapId" INTEGER NOT NULL REFERENCES "Map"("id"),
);