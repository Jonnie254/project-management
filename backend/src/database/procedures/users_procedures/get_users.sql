CREATE PROCEDURE get_users
AS
BEGIN
    select id, name, email, role from users WHERE role = 'user'
END