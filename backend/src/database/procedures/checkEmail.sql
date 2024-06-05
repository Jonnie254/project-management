CREATE OR ALTER PROCEDURE checkEmail
AS 
BEGIN
SELECT * FROM Users WHERE email = '${user.email}'
END