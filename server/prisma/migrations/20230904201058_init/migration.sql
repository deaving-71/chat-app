/*
  Warnings:

  - You are about to drop the column `createdAt` on the `channel_messages` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_channelId_fkey";

-- DropIndex
DROP INDEX "channels_creatorId_idx";

-- DropIndex
DROP INDEX "members_channelId_key";

-- DropIndex
DROP INDEX "members_userId_channelId_idx";

-- DropIndex
DROP INDEX "users_username_idx";

-- AlterTable
ALTER TABLE "channel_messages" DROP COLUMN "createdAt",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "creatorId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "channelId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSeen" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "conversationInitiatorId" TEXT NOT NULL,
    "conversationReceiverId" TEXT NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direct_messsages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "direct_messsages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelsMemberOf" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "conversations_conversationInitiatorId_key" ON "conversations"("conversationInitiatorId");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_conversationReceiverId_key" ON "conversations"("conversationReceiverId");

-- CreateIndex
CREATE INDEX "conversations_conversationInitiatorId_conversationReceiverI_idx" ON "conversations"("conversationInitiatorId", "conversationReceiverId");

-- CreateIndex
CREATE UNIQUE INDEX "direct_messsages_senderId_key" ON "direct_messsages"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "direct_messsages_conversationId_key" ON "direct_messsages"("conversationId");

-- CreateIndex
CREATE INDEX "direct_messsages_conversationId_idx" ON "direct_messsages"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelsMemberOf_AB_unique" ON "_ChannelsMemberOf"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelsMemberOf_B_index" ON "_ChannelsMemberOf"("B");

-- CreateIndex
CREATE UNIQUE INDEX "channels_ownerId_key" ON "channels"("ownerId");

-- CreateIndex
CREATE INDEX "channels_ownerId_idx" ON "channels"("ownerId");

-- CreateIndex
CREATE INDEX "members_userId_idx" ON "members"("userId");

-- CreateIndex
CREATE INDEX "users_username_email_idx" ON "users"("username", "email");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_conversationInitiatorId_fkey" FOREIGN KEY ("conversationInitiatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_conversationReceiverId_fkey" FOREIGN KEY ("conversationReceiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messsages" ADD CONSTRAINT "direct_messsages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messsages" ADD CONSTRAINT "direct_messsages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelsMemberOf" ADD CONSTRAINT "_ChannelsMemberOf_A_fkey" FOREIGN KEY ("A") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelsMemberOf" ADD CONSTRAINT "_ChannelsMemberOf_B_fkey" FOREIGN KEY ("B") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
