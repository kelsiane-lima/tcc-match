-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_advisorId_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "advisorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "advisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
