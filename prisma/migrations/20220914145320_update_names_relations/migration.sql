/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `activities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activities_classId_key" ON "activities"("classId");
