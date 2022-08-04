import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//define a service user a base url
const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,

    credentials: "include",
  }),
  //creating new user
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    //login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        headers: {
          'Acsess-Control-Allow-Headers': '*',
      },
        body: user,
      }),
    }),
    //logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "GET",
      }),
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users/update",
        method: "PUT",
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (password) => ({
        url: "/users",
        method: "DELETE",
        headers: {
          "x-api-key": password,
        },
      }),
    }),
    
    //favs
    fetchFavs: builder.mutation({
      query: () => ({
        url: "/favs/",
        method: "GET",
      }),
    }),
    addRemoveFavs: builder.mutation({
      query: (short_id) => ({
        url: "/favs/add_remove/" + short_id,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFetchFavsMutation,
  useAddRemoveFavsMutation,
} = appApi;
export default appApi;