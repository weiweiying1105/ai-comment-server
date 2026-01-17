-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "openId" TEXT NOT NULL,
    "unionId" TEXT,
    "nickName" TEXT,
    "avatarUrl" TEXT,
    "gender" INTEGER,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "language" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'CNY',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Shanghai',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_openId_key" ON "users"("openId");

-- CreateIndex
CREATE UNIQUE INDEX "users_unionId_key" ON "users"("unionId");
