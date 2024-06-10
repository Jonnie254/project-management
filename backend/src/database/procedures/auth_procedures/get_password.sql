CREATE PROCEDURE get_password (
    @id VARCHAR(255)
)
AS
BEGIN
    SELECT password from users where id = @id
END