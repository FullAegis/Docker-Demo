export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  // Include other properties returned by the login endpoint if any
}
