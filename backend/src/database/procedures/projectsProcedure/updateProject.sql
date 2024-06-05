CREATE OR ALTER PROCEDURE createProject(
    @id VARCHAR(255),
    @project_name VARCHAR(255),
    @description VARCHAR(255),
    @end_date DATETIME2,
    @updated_at DATETIME2 )

AS
BEGIN
UPDATE projects SET id=@id, project_name=@project_name, description=@description, end_date=@end_date, updated_at=@updated_at WHERE id=@id
END