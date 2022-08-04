import { createSlice } from "@reduxjs/toolkit";
import appApi from "./appApi";

export const favsSlice = createSlice({
  name: "favs",
  initialState: [],
  extraReducers: (builder) => {
    //save user after signup
    builder.addMatcher(appApi.endpoints.fetchFavs.matchFulfilled, (state, { payload }) => payload);
    builder.addMatcher(
      appApi.endpoints.addRemoveFavs.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});
export default favsSlice.reducer;
