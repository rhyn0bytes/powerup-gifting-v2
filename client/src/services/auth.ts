import axios, { AxiosInstance } from "axios";
import { IRegistration, IAuthentication, IUser } from "../models/user";

class Auth {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/api/",
    });
  }

  register(user: IRegistration) {
    return this.client.post<IUser>("signup", { user });
  }

  login(user: IAuthentication) {
    return this.client.post<IUser>("login", { user });
  }

  logout(token: string | null) {
    return this.client.delete("logout", {
      headers: {
        Authorization: token === null ? "" : token,
      },
    });
  }

  currentUser(token: string | null) {
    return this.client.get<IUser>("current_user", {
      headers: {
        Authorization: token === null ? "" : token,
        ContentType: "application/json",
      },
    });
  }
}

const auth = new Auth();
export default auth;
