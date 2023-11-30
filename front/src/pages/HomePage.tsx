import { useEffect } from "react";
import { getAllPosts } from "../services/api";
import Tweet from "../components/Tweet";
import NewTweet from "../components/NewTweet";
import { useDispatch, useSelector } from "react-redux";
import { handlePostLike, initPosts } from "../reducers/post.slice";
import NewTweetCounter from "../components/NewTweetCounter";
import { newPostCounter } from "../reducers/app.slice";

const HomePage = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: any) => state.posts);
  const { socket } = useSelector((state: any) => state.app);

  useEffect(() => {
    socket.on("newPost", () => {
      dispatch(newPostCounter());
    });

    socket.on("like", (data: any) => {
      dispatch(handlePostLike({ id: data, type: "like" }));
    });

    socket.on("unlike", (data: any) => {
      dispatch(handlePostLike({ id: data, type: "unlike" }));
    });

    return () => {
      socket.off("newPost");
      socket.off("like");
      socket.off("unlike");
    };
  }, [socket]);

  return (
    <>
      <NewTweet />

      <NewTweetCounter />

      {posts.length > 0 ? (
        posts.map((post: any, index: any) => {
          return <Tweet key={index} data={post} />;
        })
      ) : (
        <div className="text-center text-2xl">No one wants to post?</div>
      )}
    </>
  );
};

export default HomePage;
