/*
  Warnings:

  - The `color` column on the `WorkspaceMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('primary', 'secondary', 'success', 'info', 'warning', 'error');

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'primary';
