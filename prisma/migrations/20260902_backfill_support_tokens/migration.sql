-- Give legacy support tickets stable access tokens so their conversations remain reachable.
UPDATE "SupportTicket"
SET "accessToken" = lower(hex(randomblob(16)))
WHERE "accessToken" IS NULL;
