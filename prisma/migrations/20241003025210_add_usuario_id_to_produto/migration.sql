/*
  Warnings:

  - Added the required column `usuarioId` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "usuarioId" INTEGER;
