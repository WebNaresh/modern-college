/*
  Warnings:

  - You are about to drop the column `grade` on the `AverageResult` table. All the data in the column will be lost.
  - You are about to drop the column `degreeDuringPeriod` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `classConducted` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseHead` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursAlloted` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameOfSubject` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previouseYear` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `AverageResult` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `AverageResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `phdDuringPeriod` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Term" AS ENUM ('I', 'II');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('UG', 'PG');

-- CreateEnum
CREATE TYPE "CourseHead" AS ENUM ('TH', 'PR', 'T');

-- CreateEnum
CREATE TYPE "PreviouseYear" AS ENUM ('Current', 'Previous');

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "AverageResult" DROP CONSTRAINT "AverageResult_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultancyService" DROP CONSTRAINT "ConsultancyService_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "ExaminationDuty" DROP CONSTRAINT "ExaminationDuty_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "IntellectualPropertyRight" DROP CONSTRAINT "IntellectualPropertyRight_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "PeerFeedback" DROP CONSTRAINT "PeerFeedback_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramAttended" DROP CONSTRAINT "ProgramAttended_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramsOrganized" DROP CONSTRAINT "ProgramsOrganized_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "PublicationAndJournal" DROP CONSTRAINT "PublicationAndJournal_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "Responsibility" DROP CONSTRAINT "Responsibility_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "SponsoredResearch" DROP CONSTRAINT "SponsoredResearch_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "StudentFeedback" DROP CONSTRAINT "StudentFeedback_performanceId_fkey";

-- AlterTable
ALTER TABLE "Academics" ALTER COLUMN "dateOfJoining" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AverageResult" DROP COLUMN "grade",
ADD COLUMN     "classConducted" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "courseHead" "CourseHead" NOT NULL,
ADD COLUMN     "hoursAlloted" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nameOfSubject" TEXT NOT NULL,
ADD COLUMN     "previouseYear" "PreviouseYear" NOT NULL,
ADD COLUMN     "result" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "term" "Term" NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL;

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "degreeDuringPeriod",
ADD COLUMN     "phdDuringPeriod" TEXT NOT NULL,
ALTER COLUMN "classEngagement" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AverageResult" ADD CONSTRAINT "AverageResult_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFeedback" ADD CONSTRAINT "StudentFeedback_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerFeedback" ADD CONSTRAINT "PeerFeedback_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationAndJournal" ADD CONSTRAINT "PublicationAndJournal_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramsOrganized" ADD CONSTRAINT "ProgramsOrganized_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramAttended" ADD CONSTRAINT "ProgramAttended_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsoredResearch" ADD CONSTRAINT "SponsoredResearch_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultancyService" ADD CONSTRAINT "ConsultancyService_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntellectualPropertyRight" ADD CONSTRAINT "IntellectualPropertyRight_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationDuty" ADD CONSTRAINT "ExaminationDuty_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsibility" ADD CONSTRAINT "Responsibility_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
