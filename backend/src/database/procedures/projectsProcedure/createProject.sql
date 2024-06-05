CREATE OR ALTER PROCEDURE createProject(
    @id VARCHAR(255),
    @project_name VARCHAR(255),
    @description VARCHAR(255),
    @end_date DATETIME2,
    @created_at DATETIME2 )
AS
BEGIN
    INSERT INTO projects(id, project_name, description, end_date, created_at)
    VALUES(@id, @project_name, @description, @end_date, @created_at)
END