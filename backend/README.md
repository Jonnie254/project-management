# FRONTEND

## ROUTES

### Everything

- return: {success: boolean, message: string, data: any}

### Auth

- POST /auth/register
- @params: { id, name, email, password }

- POST /auth/login
- @params: { email, password }

- GET /auth/logout

- PUT /auth/update
- @params: {id, name, email}

- PUT /auth/update-password
- @params: {id, oldPassword, password}

- PUT /auth/forgot-password
- @params: {id, password}

### Users

- GET /users/all
- return: { data: [ { id, name, email, role} ] }\

- GET /users/id
- return: { data: { id, name, email, role} }

- POST /users/create
- @params: { name, email, password }

- PUT /users/update/id
- @params: { name, email, password }

- DELETE /users/delete/id

- GET /users/assigned
- return: { data: [ { id, name, email, role} ] }

- GET /users/unassigned
- return: { data: [ { id, name, email, role} ] }

### projects

- POST /projects/create
- @params: { name, description, end_date, assignedUser }

- PUT /projects/update/id
- @params: { name, description, end_date, assignedUser }

- DELETE /projects/delete/id

- GET /projects/all
- return: { data: [ { id, name, description, end_date, assignedUser} ] }

- GET /projects/id
- return: { data: { id, name, description, end_date, assignedUser} }
