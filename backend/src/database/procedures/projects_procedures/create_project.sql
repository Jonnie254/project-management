CREATE PROCEDURE create_project(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @end_date VARCHAR(255),
    @user_id VARCHAR(255),
    @created_at VARCHAR(255),
    @updated_at VARCHAR(255))
AS
BEGIN
    INSERT INTO projects(id, name, description, end_date, user_id, created_at, updated_at)
    VALUES(@id, @name, @description, @end_date, @user_id, @created_at, @updated_at)
END