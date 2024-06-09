CREATE PROCEDURE update_password(
    @id VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE users SET password=@password WHERE id=@id
END;