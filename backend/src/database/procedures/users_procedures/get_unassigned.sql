CREATE PROCEDURE get_unassigned
AS
BEGIN
    SELECT u.id, u.name, u.email, u.role
    FROM users u
    LEFT JOIN projects p ON u.id = p.user_id
    WHERE p.user_id IS NULL;
END;
