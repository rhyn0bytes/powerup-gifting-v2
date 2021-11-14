export interface IAuthentication {
  email: string;
  password: string;
}

export interface IRegistration extends IAuthentication {
  password_confirmation: string;
}

export interface IUser {
  id: number;
  email: string;
  created_at: string;
}