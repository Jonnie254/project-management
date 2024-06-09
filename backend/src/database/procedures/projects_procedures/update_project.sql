CREATE PROCEDURE update_project(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @end_date VARCHAR(255),
    @user_id VARCHAR(255),
    @updated_at VARCHAR(255)
)
AS
BEGIN
UPDATE projects SET name=@name, description=@description, end_date=@end_date, user_id=@user_id, updated_at=@updated_at WHERE id=@id
END;