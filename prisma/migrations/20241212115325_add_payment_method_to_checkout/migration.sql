/*
  Warnings:

  - Made the column `receiveDate` on table `checkout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `checkout` ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'Cash on Delivery',
    MODIFY `receiveDate` DATETIME(3) NOT NULL;
