SELECT id, password 
FROM "user"
WHERE name = ${userName} 
  AND active=true;
