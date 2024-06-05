CREATE OR ALTER PROCEDURE updatequery
AS
BEGIN
SELECT * FROM projects WHERE id='${project-id}'
END