CREATE PROCEDURE get_project (
    @id VARCHAR(255)
)
AS
BEGIN 
SELECT * FROM projects WHERE id = @id
END