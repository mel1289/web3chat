import { Post } from 'src/modules/post/post.schema';

export type PostDetails = {
  post: Post;
  nbrOfLikes: number;
  nbrOfComments: number;
  liked: boolean;
};
