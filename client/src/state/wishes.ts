import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { IWish, IWishDTO } from "models/wish";
import { IUser } from "models/user";

type AllWishesRespons = {
  user: IUser;
  wishes: IWish[];
}[];
type WishesResponse = IWish[];

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.authToken;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const wishesApi = createApi({
  reducerPath: "wishesApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Wish", "AllWishes"],
  endpoints: (build) => ({
    getWishes: build.query<WishesResponse, void>({
      query: () => `wishes`,

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Wish" as const, id })),
              { type: "Wish", id: "LIST" },
            ]
          : [{ type: "Wish", id: "LIST" }],
    }),
    getWish: build.query<IWish, number>({
      query: (wishId) => `wishes/${wishId}`,
    }),
    updateWish: build.mutation<IWish, Partial<IWish>>({
      query: ({ id, ...wish }) => ({
        url: `wishes/${id}`,
        method: "PUT",
        body: wish,
      }),
      invalidatesTags: ["Wish"],
    }),
    createWish: build.mutation<IWishDTO, Partial<IWish>>({
      query: (body) => ({
        url: `wishes`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Wish", id: "LIST" }],
    }),
    getAllWishes: build.query<AllWishesRespons, void>({
      query: () => `all/wishes`,
    }),
  }),
});

export const {
  useGetAllWishesQuery,
  useCreateWishMutation,
  useGetWishQuery,
  useGetWishesQuery,
  useUpdateWishMutation,
} = wishesApi;
