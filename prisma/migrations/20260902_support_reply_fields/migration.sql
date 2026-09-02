-- Add current support-ticket access and reply state while preserving existing conversations.

ALTER TABLE "SupportTicket" ADD COLUMN "accessToken" TEXT;

PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_SupportReply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "senderType" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SupportReply_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "SupportTicket" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_SupportReply" ("id", "ticketId", "message", "senderType", "isRead", "createdAt")
SELECT "id", "ticketId", "message", CASE WHEN "isAdmin" = 1 THEN 'ADMIN' ELSE 'CUSTOMER' END, false, "createdAt"
FROM "SupportReply";

DROP TABLE "SupportReply";
ALTER TABLE "new_SupportReply" RENAME TO "SupportReply";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

CREATE UNIQUE INDEX "SupportTicket_accessToken_key" ON "SupportTicket"("accessToken");
