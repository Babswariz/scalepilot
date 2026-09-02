-- Store Flutterwave transactions without changing existing application data.
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionReference" TEXT NOT NULL,
    "flutterwaveTransactionId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "selectedPlan" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "serviceRequestId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "Payment_transactionReference_key" ON "Payment"("transactionReference");
CREATE UNIQUE INDEX "Payment_flutterwaveTransactionId_key" ON "Payment"("flutterwaveTransactionId");