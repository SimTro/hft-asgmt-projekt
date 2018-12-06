BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `SzenenLinks` (
	`SzenenLink`	TEXT NOT NULL,
	`Automarke`	TEXT NOT NULL,
	`Model`	TEXT NOT NULL
);
INSERT INTO `SzenenLinks` VALUES ('www.google.de','Rover','Mini
');
INSERT INTO `SzenenLinks` VALUES ('https://www.mini-forum.de/forums/10-Motor','Rover
','Landrover');
INSERT INTO `SzenenLinks` VALUES ('https://www.mini-forum.de','Mercedes','W 111');
INSERT INTO `SzenenLinks` VALUES ('www.amazon.de','Mercedes
','W 125
');
CREATE TABLE IF NOT EXISTS `Links` (
	`Link`	TEXT NOT NULL,
	`Kategorie`	TEXT NOT NULL,
	`Model`	TEXT NOT NULL,
	`Automarke`	TEXT NOT NULL,
	`Status`	INTEGER NOT NULL
);
COMMIT;
