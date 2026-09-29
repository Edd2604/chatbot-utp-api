/*
  Warnings:

  - Added the required column `size` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_size` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "last_run" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "size" DECIMAL(10,3) NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "documents_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_size" DECIMAL(10,3) NOT NULL;
