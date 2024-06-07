-- CreateTable
CREATE TABLE "p2pTransfer" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserID" INTEGER NOT NULL,
    "toUserID" INTEGER NOT NULL,

    CONSTRAINT "p2pTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_fromUserID_fkey" FOREIGN KEY ("fromUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_toUserID_fkey" FOREIGN KEY ("toUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
