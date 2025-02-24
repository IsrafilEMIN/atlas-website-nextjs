/*
  Warnings:

  - The values [INTERIOR,EXTERIOR,COMMERCIAL,RESIDENTIAL] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('EXTERIOR_PAINTING', 'COMMERCIAL_PAINTING', 'RESIDENTIAL_PAINTING', 'WALL_COVERING', 'DRYWALL_PLASTERING');
ALTER TABLE "Review" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TABLE "Booking" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ReviewToken" DROP CONSTRAINT "ReviewToken_customerId_fkey";

-- AlterTable
ALTER TABLE "ReviewToken" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewToken" ADD CONSTRAINT "ReviewToken_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
