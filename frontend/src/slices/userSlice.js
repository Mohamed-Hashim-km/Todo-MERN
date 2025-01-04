import { apiSlice } from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/api/users/auth",
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } = userSlice;
