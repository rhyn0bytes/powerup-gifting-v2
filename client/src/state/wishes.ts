import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { IWish, IWishDTO } from "models/wish";

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
  tagTypes: ["Wish"],
  endpoints: (build) => ({
    getWishes: build.query<WishesResponse, void>({
      query: (name) => `wishes`,

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Wish" as const, id })),
              { type: "Wish", id: "LIST" },
            ]
          : [{ type: "Wish", id: "LIST" }],
    }),
    createWish: build.mutation<IWishDTO, Partial<IWish>>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Wish", id: "LIST" }],
    }),
  }),
});

export const getWishes = wishesApi.endpoints.getWishes.useQuery;
