CREATE OR ALTER PROCEDURE fetchProjects
AS
BEGIN
    SELECT id, name, description, end_date, users_id, created_at, updated_at
    FROM projects
END
