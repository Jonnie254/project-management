CREATE OR ALTER PROCEDURE createProject
(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @end_date DATETIME2,
    @created_at DATETIME2,
    @updated_at DATETIME2,
    @user_email VARCHAR(255)
)
AS
BEGIN
    DECLARE @user_id VARCHAR(255);

    -- Retrieve the user_id based on the provided user_email
    SELECT @user_id=id FROM users WHERE email = @user_email;

    IF @user_id IS NULL
    BEGIN
        -- Handle the case where the user is not found
        RAISERROR('User not found.', 16, 1);
        RETURN;
    END;

    -- Insert the project with the retrieved user_id and provided user_email
    INSERT INTO projects (id, name, description, end_date, created_at, updated_at, user_id, user_email)
    VALUES (@id, @name, @description, @end_date, @created_at, @updated_at, @user_id, @user_email);
END;
