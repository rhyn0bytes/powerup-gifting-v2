import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../services/auth";
import { IAuthentication, IRegistration, IUser } from "../models/user";
import { RootState } from "./store";

export const login = createAsyncThunk<
  { user: IUser; token: string },
  { user: IAuthentication },
  { rejectValue: string | unknown }
>("login", async ({ user }, { rejectWithValue }) => {
  try {
    const req = await auth.login(user);
    return { user: req.data, token: req.headers.authorization };
  } catch (err) {
    return rejectWithValue("Invalid email or password.");
  }
});

export const logout = createAsyncThunk(
  "logout",
  async (_, { getState, rejectWithValue }) => {
    const { authToken } = (getState() as RootState).auth;
    if (authToken) {
      const req = await auth.logout(authToken);
      return req.data;
    } else {
      return rejectWithValue(`You dun' goofed`);
    }
  }
);

export const signup = createAsyncThunk<
  { user: IUser; token: string },
  { user: IRegistration },
  { rejectValue: string | unknown }
>("signup", async ({ user }, { rejectWithValue }) => {
  let preResponseErrors: Array<string> = [];
  if (user.password !== user.password_confirmation) {
    preResponseErrors.push("Password does not match Password Confirmation.")
  }
  if (user.password.length < 6) {
    preResponseErrors.push("Password must be 6 or more characters.")
  }
  if (preResponseErrors.length > 0) {
    return rejectWithValue(preResponseErrors.join(" "))
  }
  try {
    const req = await auth.register(user);
    return { user: req.data, token: req.headers.authorization };
  } catch (err) {
    console.log(err);
    return rejectWithValue("Email is already taken.");
  }
});

export const getCurrentUser = createAsyncThunk<
  IUser,
  void,
  { state: RootState; rejectValue: string }
>("getCurrentUser", async (_nothing, { getState, rejectWithValue }) => {
  const { authToken } = getState().auth;
  if (authToken) {
    const req = await auth.currentUser(authToken);
    return req.data;
  } else {
    return rejectWithValue(`You dun' goofed`);
  }
});

const initialState: AuthState = {
  loading: false,
  authToken: window.localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;

        state.loading = false;
        state.user = user;
        state.authToken = token;
        state.error = undefined;

        window.localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state, action) => {
        const error = action.payload;
        state.loading = false;
        state.error = error;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { user, token } = action.payload;

        state.loading = false;
        state.user = user;
        state.authToken = token;
        state.error = undefined;

        window.localStorage.setItem("token", token);
      })
      .addCase(signup.rejected, (state, action) => {
        const error = action.payload;
        console.log(error);
        state.loading = false;
        state.error = error;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {})
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })
      .addCase(getCurrentUser.rejected, (state) => {})
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        window.localStorage.removeItem("token");
        state.authToken = null;
        state.user = undefined;
      })
      .addCase(logout.rejected, (state) => {
        window.localStorage.removeItem("token");
        state.authToken = null;
        state.user = undefined;
      });
  },
});

type AuthState = {
  loading: boolean;
  authToken: string | null;
  idToken?: string;
  user?: IUser;
  error?: string | unknown;
};

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.authToken;

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectErrors = (state: RootState) =>
  state.auth.error as string;

export const { reducer, actions } = authSlice;

export default reducer;
