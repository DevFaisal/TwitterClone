-- CreateTable
CREATE TABLE "nestedComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "nestedComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nestedComment" ADD CONSTRAINT "nestedComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
