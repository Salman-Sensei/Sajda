-- Run this ONCE to clear all test/stale data and start fresh.
-- After running, everyone will register via "Other" / custom name entry.

-- Delete all prayer logs (they're tied to old test users)
DELETE FROM prayer_logs;

-- Delete all people except Salman (keep the original user)
DELETE FROM people WHERE name != 'Salman' AND name IS NOT NULL;

-- Make sure Salman's PIN is set (update if needed)
UPDATE people SET pin = '1234' WHERE name = 'Salman';

-- Verify what's left
SELECT id, name, pin FROM people;
