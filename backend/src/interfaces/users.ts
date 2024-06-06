export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface user_login {
  email: string;
  password: string;
}
