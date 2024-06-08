CREATE OR ALTER PROCEDURE createProject(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @end_date DATETIME2,
    @users_id VARCHAR(255),
    @created_at DATETIME2,
    @updated_at DATETIME2
)
AS
BEGIN
    INSERT INTO projects(id, name, description, end_date, users_id,created_at, updated_at )
    VALUES(@id, @name, @description, @end_date, @users_id, @created_at, @updated_at)
END
