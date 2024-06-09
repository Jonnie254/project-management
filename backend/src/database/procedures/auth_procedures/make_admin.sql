CREATE PROCEDURE make_admin(
    @id VARCHAR(255)
)
AS
BEGIN
    UPDATE users SET role = 'admin' WHERE id = @id
END;