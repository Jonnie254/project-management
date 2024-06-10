CREATE PROCEDURE get_my_project (
    @user_id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM projects WHERE user_id = @user_id;
END;