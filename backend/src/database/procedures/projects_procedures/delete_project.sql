CREATE PROCEDURE delete_project(
    @id VARCHAR(255)
)
AS
BEGIN
    DELETE FROM projects WHERE id = @id
END