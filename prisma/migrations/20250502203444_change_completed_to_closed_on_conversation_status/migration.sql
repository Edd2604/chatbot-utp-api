/*
  Warnings:

  - The values [COMPLETED] on the enum `ConversationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConversationStatus_new" AS ENUM ('ACTIVE', 'CLOSED');
ALTER TABLE "Conversation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Conversation" ALTER COLUMN "status" TYPE "ConversationStatus_new" USING ("status"::text::"ConversationStatus_new");
ALTER TYPE "ConversationStatus" RENAME TO "ConversationStatus_old";
ALTER TYPE "ConversationStatus_new" RENAME TO "ConversationStatus";
DROP TYPE "ConversationStatus_old";
ALTER TABLE "Conversation" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;
