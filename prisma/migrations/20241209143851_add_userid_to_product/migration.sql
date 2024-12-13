/*
  Warnings:

  - Added the required column `userID` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `userID` INT NOT NULL DEFAULT 1;

ALTER TABLE `Product` ADD FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
