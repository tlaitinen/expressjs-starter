CREATE TABLE IF NOT EXISTS version (version INTEGER PRIMARY KEY);
INSERT INTO version
SELECT 0
WHERE
    NOT EXISTS (
        SELECT version FROM version
    );
