CREATE PROCEDURE update_details (
    @id VARCHAR(255),
    @name VARCHAR(255),
    @email VARCHAR(255)
)
AS
BEGIN
    UPDATE users SET name=@name, email=@email WHERE id=@id
END;