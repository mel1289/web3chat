import { createSlice, current } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: [] as any,

  reducers: {
    initPosts: (state, { payload }) => {
      state = [...payload];
      return state;
    },

    findPost: (state, { payload }) => {
      const index = current(state).findIndex(
        (itm: any) => itm.post._id == payload.id
      );

      return state[index];
    },

    likePost: (state, { payload }) => {
      const index = current(state).findIndex(
        (itm: any) => itm.post._id == payload
      );

      state[index].liked = true;
    },

    unlikePost: (state, { payload }) => {
      const index = current(state).findIndex(
        (itm: any) => itm.post._id == payload
      );

      state[index].liked = false;
    },

    handlePostLike: (state, { payload }) => {
      const index = current(state).findIndex(
        (itm: any) => itm.post._id == payload.id
      );

      if (index > -1) {
        if (payload.type == "like") state[index].nbrOfLikes++;
        else state[index].nbrOfLikes--;
      }
    },

    addPost: (state, { payload }) => {
      state.unshift(payload);
    },

    editPost: (state, { payload }) => {
      const index = current(state).findIndex(
        (itm: any) => itm.post._id == payload
      );

      state[index].post.content = "fdp";
    },
  },
});

export const {
  initPosts,
  findPost,
  likePost,
  unlikePost,
  handlePostLike,
  addPost,
  editPost,
} = postSlice.actions;
export default postSlice.reducer;
