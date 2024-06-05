CREATE OR ALTER PROCEDURE RegisterUser(
    @id VARCHAR(255),
    @name VARCHAR (255),
    @email VARCHAR(20),
    @password VARCHAR(255)
)
AS
BEGIN
 INSERT INTO Users (id, name, email, password)
 VALUES(@id,@name,@email,@password)
END