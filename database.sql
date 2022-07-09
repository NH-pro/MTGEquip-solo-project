
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE "match" CASCADE;
DROP TABLE "user_match_junction" CASCADE;
DROP TABLE "commander_damage_junction" CASCADE;
DROP TABLE "notes" CASCADE;


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "match" (
	"id" SERIAL PRIMARY KEY,
	"code" VARCHAR (80) UNIQUE NOT NULL,
	"date" DATE,
	"winner_id" INT REFERENCES "user"
);

CREATE TABLE "user_match_junction" (
	"id" SERIAL PRIMARY KEY,
	"match_id" INT REFERENCES "match",
	"user_id" INT REFERENCES "user",
	"hp" INT,
	"poison" INT
);

CREATE TABLE "commander_damage_junction" (
	"id" SERIAL PRIMARY KEY,
	"match_id" INT REFERENCES "match",
	"attacker_id" INT REFERENCES "user",
	"defender_id" INT REFERENCES "user",
	"amount" INT
);

CREATE TABLE "notes" (
	"id" SERIAL PRIMARY KEY,
	"user_match_id" INT REFERENCES "user_match_junction",
	"note" VARCHAR (300)
);


SELECT 
	"user".id,
	"user".username,
	user_match_junction.id AS junction_id,
	user_match_junction.match_id,
	user_match_junction.user_id,
	user_match_junction.hp,
	user_match_junction.poison
FROM user_match_junction
JOIN "user"
ON user_match_junction.user_id = "user".id
WHERE match_id = 12;
