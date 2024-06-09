DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;

DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql = @sql + 'DROP PROCEDURE [' + SCHEMA_NAME(schema_id) + '].[' + name + '];' + CHAR(13)
FROM sys.procedures;

PRINT @sql;

EXEC sp_executesql @sql;