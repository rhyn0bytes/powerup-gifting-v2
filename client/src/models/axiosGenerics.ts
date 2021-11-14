import { IUser } from "./user";

export interface IAxiosResponse {
  user?: IUser;
  message?: string;
}