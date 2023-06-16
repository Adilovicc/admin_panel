-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'regular',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ActiveLimits" (
    "id" TEXT NOT NULL,
    "rib_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "rmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "cib_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "cmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ActiveLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LimitRequest" (
    "id" TEXT NOT NULL,
    "crt_rib_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "crt_rmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "crt_cib_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "crt_cmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "rib_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "rmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 50000.00,
    "cib_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "cmb_limit" DECIMAL(65,30) NOT NULL DEFAULT 10000000.00,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "resolvedBy" TEXT,
    "resolvedTime" TIMESTAMP(3),
    "rejectedReason" TEXT,

    CONSTRAINT "LimitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveLimits_userId_key" ON "ActiveLimits"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveLimits" ADD CONSTRAINT "ActiveLimits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitRequest" ADD CONSTRAINT "LimitRequest_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
