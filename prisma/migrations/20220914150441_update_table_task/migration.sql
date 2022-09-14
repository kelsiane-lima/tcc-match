/*
  Warnings:

  - You are about to drop the column `deadline` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "deadline",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
