CREATE OR ALTER PROCEDURE logins(
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS 
BEGIN
    SELECT * FROM Users WHERE email = @email
END