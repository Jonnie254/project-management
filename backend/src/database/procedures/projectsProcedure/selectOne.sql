CREATE OR ALTER PROCEDURE selectOne
AS
BEGIN 
SELECT * FROM projects WHERE id = '${project_id}'
END