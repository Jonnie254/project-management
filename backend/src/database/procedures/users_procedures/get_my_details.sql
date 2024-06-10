CREATE PROCEDURE get_my_details (
    @id VARCHAR(255)
)
AS
BEGIN
    SELECT id, name, email, role FROM users WHERE id = @id;
END;