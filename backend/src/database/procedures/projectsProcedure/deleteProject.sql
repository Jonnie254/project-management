CREATE OR ALTER PROCEDURE deleteProject
AS
BEGIN
SELECT * FROM projects WHERE id = '${project_id}'
END