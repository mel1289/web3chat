import { useDispatch, useSelector } from "react-redux";
import { initNewPostCounter } from "../reducers/app.slice";
import { initPosts } from "../reducers/post.slice";
import { getAllPosts } from "../services/api";

const NewTweetCounter = () => {
  const dispatch = useDispatch();
  const { newPostCounter } = useSelector((state: any) => state.app);

    const loadNewTweet = async () => {
      try {
        const { data } = await getAllPosts();
  
        dispatch(initPosts(data));
        dispatch(initNewPostCounter())
      } catch (e) {}
    }

  return (
    <>
      {newPostCounter > 0 && (
        <div className="p-2 text-center bg-white tweet rounded-lg border border-gray-200 hover:bg-gray-100 mb-2 cursor-pointer" onClick={loadNewTweet}>
          Show {newPostCounter} Posts
        </div>
      )}
    </>
  );
};

export default NewTweetCounter;
