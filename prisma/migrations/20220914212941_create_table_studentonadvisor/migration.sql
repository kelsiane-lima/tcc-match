/*
  Warnings:

  - You are about to drop the column `advisorId` on the `students` table. All the data in the column will be lost.
  - Changed the type of `completed` on the `ActivityOnStudent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_advisorId_fkey";

-- AlterTable
ALTER TABLE "ActivityOnStudent" DROP COLUMN "completed",
ADD COLUMN     "completed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "advisorId";

-- DropEnum
DROP TYPE "Completed";

-- CreateTable
CREATE TABLE "StudentOnAdvisor" (
    "advisorId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "evaluated" BOOLEAN NOT NULL,

    CONSTRAINT "StudentOnAdvisor_pkey" PRIMARY KEY ("advisorId","studentId")
);

-- AddForeignKey
ALTER TABLE "StudentOnAdvisor" ADD CONSTRAINT "StudentOnAdvisor_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "advisors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnAdvisor" ADD CONSTRAINT "StudentOnAdvisor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
