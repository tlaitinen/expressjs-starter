SELECT
  json_build_object(
    'id', u.id,
    'name', u.name,
    'firstName', u.first_name,
    'lastName', u.last_name,
    'organization', u.organization,
    'email', u.email
  ) AS json
FROM
  "user" AS u
WHERE
  u.id = ${id}
  AND (${authId} = ${id} 
--    OR EXISTS (
--      SELECT 1 
--      FROM role AS r
--      WHERE r.user_id = u.id AND has_any_role(${authId}, r.user_group_id)
--    )
--  )
