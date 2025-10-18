/*
  Warnings:

  - The `currency` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('UAH', 'USD', 'EUR', 'GBP', 'PLN', 'CZK', 'CAD', 'BYN', 'CNY', 'RUB', 'BTC');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';
