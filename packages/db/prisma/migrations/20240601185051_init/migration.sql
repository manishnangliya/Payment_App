-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
