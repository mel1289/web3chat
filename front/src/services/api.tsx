import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

const authHeader = () => {
  const jwt = window.localStorage.getItem("jwt");

  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
};

export const getAuthNonce = (wallet: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/auth/nonce/${wallet}`);
};

export const verifyAuthSignature = (
  token: string,
  signature: string
): Promise<AxiosResponse> => {
  return axiosClient.post("/auth/verify", {
    token,
    signature,
  });
};

export const getAllPosts = (): Promise<AxiosResponse> => {
  return axiosClient.get("/posts", authHeader());
};

export const getPost = (postId: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/posts/${postId}`, authHeader());
};

export const newPost = (content: string): Promise<AxiosResponse> => {
  return axiosClient.post("/posts", { content }, authHeader());
};

export const newComment = (
  postId: string,
  content: string
): Promise<AxiosResponse> => {
  return axiosClient.post("/comments", { postId, content }, authHeader());
};

export const getPostComment = (postId: string): Promise<AxiosResponse> => {
  return axiosClient.get(`/comments/${postId}`, authHeader());
};

export const likePost = (postId: string): Promise<AxiosResponse> => {
  return axiosClient.post("/like", { postId }, authHeader());
};

export const unlikePost = (postId: string): Promise<AxiosResponse> => {
  return axiosClient.delete(`/like/${postId}`, authHeader());
};

export const updateUsername = (username: string): Promise<AxiosResponse> => {
  return axiosClient.post("/users/username", { username }, authHeader());
};

export const me = (): Promise<AxiosResponse> => {
  return axiosClient.get("/users/me", authHeader());
};
