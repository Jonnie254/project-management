CREATE OR ALTER PROCEDURE selectOne
    @id VARCHAR(255) 
AS
BEGIN 
    SELECT * FROM projects WHERE id = @id
END