/*
  Warnings:

  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_activityId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_studentId_fkey";

-- DropTable
DROP TABLE "tasks";

-- CreateTable
CREATE TABLE "ActivityOnStudent" (
    "activityId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "completed" "Completed" NOT NULL DEFAULT 'NO',

    CONSTRAINT "ActivityOnStudent_pkey" PRIMARY KEY ("activityId","studentId")
);

-- AddForeignKey
ALTER TABLE "ActivityOnStudent" ADD CONSTRAINT "ActivityOnStudent_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityOnStudent" ADD CONSTRAINT "ActivityOnStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
