CREATE PROCEDURE get_user_email(
    @email VARCHAR(255)
)
AS
BEGIN
    select id, name, email, role from users WHERE email = @email
END;