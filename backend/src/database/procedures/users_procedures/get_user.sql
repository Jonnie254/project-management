CREATE PROCEDURE get_user(
    @id VARCHAR(255)
)
AS
BEGIN
    select id, name, email, role from users WHERE id = @id
END