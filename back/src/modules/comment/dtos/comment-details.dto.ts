import { Comment } from "../comment.schema";

export class CommentDetails {
    comments: Comment[];
    nbrOfComments: number;
}

export class CommentRepliesDetails {
    replies: Comment[];
    nbrOfReplies: number;
}