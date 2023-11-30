import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    initUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { initUser } = userSlice.actions;
export default userSlice.reducer;
