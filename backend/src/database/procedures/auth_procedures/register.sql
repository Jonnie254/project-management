CREATE PROCEDURE register(
    @id VARCHAR(255),
    @name VARCHAR (255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
 INSERT INTO users (id, name, email, password)
 VALUES(@id,@name,@email,@password)
END