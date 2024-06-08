CREATE OR ALTER PROCEDURE updateProject
  @id VARCHAR(255),
  @name VARCHAR(255),
  @description VARCHAR(255),
  @end_date DATETIME2,
  @users_id VARCHAR(255),
  @created_at DATETIME2,
  @updated_at DATETIME2
AS
BEGIN
  UPDATE projects
  SET 
    name = COALESCE(NULLIF(@name, ''), name),
    description = COALESCE(NULLIF(@description, ''), description),
    end_date = @end_date,
    users_id = COALESCE(NULLIF(@users_id, ''), users_id),
    created_at = @created_at,
    updated_at = @updated_at
  WHERE id = @id;
END
