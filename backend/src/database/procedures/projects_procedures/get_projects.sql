CREATE PROCEDURE get_projects
AS
BEGIN
    SELECT 
        p.*,
        u.name AS user_name,
        u.email AS user_email
    FROM 
        projects p
    JOIN 
        users u
    ON 
        p.user_id = u.id;
END;