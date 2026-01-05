/*

Exemplos de queries que estão sendo executadas pelo Prisma

*/

-- api/maps/ GET
SELECT
    M.id,
    M.name,
    M.latitude,
    M.longitude,
    M.borders,
    M.createdAt,
    P.id AS [point id], 
    P.name,
    P.latitude,
    P.longitude,
    P.mapId
FROM Map as M;
INNER JOIN POIs P ON P.mapId = M.id;

-- api/maps/ POST
INSERT INTO Map (name,latitude,longitude,borders) 
VALUES(
    'Rio de Janeiro',
    -22.9110137,
    -43.2093727,
    'borders{}');

SELECT 
    *
FROM Map 
WHERE id=4;

-- api/maps/ DELETE
DELETE FROM Map;
DELETE FROM POIs;

-- api/maps/{mapId} GET
SELECT
    P.id, 
    P.name,
    P.latitude,
    P.longitude,
    P.mapId
FROM POIs as P 
WHERE P.mapId = 3;

-- api/maps/{mapId} DELETE
DELETE FROM Map WHERE id=3;

-- api/maps/{mapId}/points POST
INSERT INTO POIs 
VALUES (
    'Minha Casa',
    -22.9110137,
    -43.2093727,5);

SELECT
    *
FROM POIs;

-- api/maps/{mapId}/points DELETE
DELETE FROM POIs WHERE id = 3;

-- api/maps/points/{pointId} PUT
UPDATE POIs SET name='Nome editado' WHERE id = 10;
SELECT * FROM POIs WHERE id = 10;

-- api/maps/points/{pointId} DELETE
DELETE FROM POIs 
WHERE mapId=3 AND id=10;

