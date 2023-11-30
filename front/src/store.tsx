import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducers/app.slice";
import postSlice from "./reducers/post.slice";
import userSlice from "./reducers/user.slice";
export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    posts: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
