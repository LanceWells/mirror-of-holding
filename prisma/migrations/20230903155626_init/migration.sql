-- CreateEnum
CREATE TYPE "PartType" AS ENUM ('Head', 'Body', 'LeftLeg', 'RightLeg', 'LeftArm', 'RightArm', 'Hair', 'Eyes', 'FacialHair', 'FaceAccessory', 'HairAccessory');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('Small', 'Medium', 'Large');

-- CreateTable
CREATE TABLE "BodyPart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anchorX" INTEGER NOT NULL,
    "anchorY" INTEGER NOT NULL,
    "partType" "PartType" NOT NULL,
    "bodyTypes" "BodyType"[],
    "outfitID" INTEGER NOT NULL,

    CONSTRAINT "BodyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outfit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Outfit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyLayout" (
    "bodyType" "BodyType" NOT NULL,
    "partType" "PartType" NOT NULL,
    "anchorX" INTEGER NOT NULL,
    "anchorY" INTEGER NOT NULL,

    CONSTRAINT "BodyLayout_pkey" PRIMARY KEY ("bodyType","partType")
);

-- AddForeignKey
ALTER TABLE "BodyPart" ADD CONSTRAINT "BodyPart_outfitID_fkey" FOREIGN KEY ("outfitID") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
