/*
  Warnings:

  - A unique constraint covering the columns `[ticket]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_ticket_key" ON "Event"("ticket");
