import { useEffect, useState } from "react";
import { getPost, getPostComment } from "../services/api";
import Tweet from "../components/Tweet";
import { useLocation, useParams } from "react-router-dom";
import NewReply from "../components/NewReply";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { id }: any = useParams();

  const { socket } = useSelector((state: any) => state.app);

  const [currentPost, setCurrentPost]: any = useState();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const post = await getPost(id);
      const comments = await getPostComment(id);

      setCurrentPost(post.data);
      setComments(comments.data);
    } catch (e) {}
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (!currentPost) return;

    socket.on("like", (data: any) => {
      if (data === currentPost.post._id) {
        const oldLikes = currentPost.nbrOfLikes;

        setCurrentPost((prev: any) => ({
          ...prev,
          nbrOfLikes: oldLikes + 1,
          liked: true
        }));
      }
    });

    socket.on("unlike", (data: any) => {
      if (data === currentPost.post._id) {
        const oldLikes = currentPost.nbrOfLikes;

        setCurrentPost((prev: any) => ({
          ...prev,
          nbrOfLikes: oldLikes - 1,
          liked: false
        }));
      }
    });

    return () => {
      socket.off("like");
      socket.off("unlike");
    };
  });

  return (
    <>
      {currentPost && <Tweet data={currentPost} clickable={false} />}

      {comments &&
        comments.map((comment: any) => {
          return (
            <div className="p-4 bg-white tweet rounded-lg border border-gray-200 hover:bg-gray-100 mb-2 cursor-pointer">
              {comment.content}
            </div>
          );
        })}

      <NewReply id={id} />
    </>
  );
};

export default PostPage;
