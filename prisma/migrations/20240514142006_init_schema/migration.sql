/*
  Warnings:

  - Added the required column `ownerId` to the `Todolist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todolist" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todolist" ADD CONSTRAINT "Todolist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
