CREATE PROCEDURE check_email(
    @email VARCHAR(255)
)
AS
BEGIN
    SELECT id, name, email, role, password FROM users WHERE email = @email
END;