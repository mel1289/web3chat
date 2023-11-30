import moment from "moment";
import { BsFillChatFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  likePost as stateLikePost,
  unlikePost as stateUnlikePost,
} from "../reducers/post.slice";

const Tweet = ({ data, clickable = true, index }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let finalTweet: string = "";

  const { socket } = useSelector((state: any) => state.app);

  data.post.content.split(" ").forEach((str: any) => {
    if (str.length > 1 && str[0] == "#") {
      finalTweet += ` <a href="#">${str}</a> `;
    } else {
      finalTweet += " " + str;
    }
  });

  const likeIconAnimation = (element: any) => {
    element.classList.add("animate__animated", "animate__bounce");

    element.addEventListener("animationend", () => {
      element.classList.remove("animate__animated", "animate__bounce");
    });
  };

  const like = async (e: any) => {
    // likeIconAnimation(e.target);

    try {
      socket.emit("like", data.post._id);
      dispatch(stateLikePost(data.post._id));
      //await likePost(data.post._id);
    } catch (e) {}
  };

  const unlike = async (e: any) => {
    // likeIconAnimation(e.target);

    try {
      socket.emit("unlike", data.post._id);
      dispatch(stateUnlikePost(data.post._id));
      //await unlikePost(data.post._id);
    } catch (e) {}
  };

  return (
    <>
      <div className="p-6 tweet rounded-lg border border-gray-200 hover:border-gray-300 mb-2 cursor-pointer">
        <div
          onClick={() => {
            if (clickable) navigate(`/posts/${data.post._id}`);
          }}
        >
          <div className="text-xl font-bold tracking-tight">
            {data.post.author.username}
          </div>
          <div className="mb-2 text-xs text-gray-600">
            @{data.post.author.wallet} -{" "}
            {moment().to(
              moment(Number(moment(data.post.createdAt).format("x")))
            )}
          </div>
          <p
            className="font-normal"
            dangerouslySetInnerHTML={{ __html: finalTweet }}
          />

          <hr className="mt-4 mb-4" />
        </div>
        <div className="flex">
          <div className="inline-flex items-baseline mr-4">
            <BsFillChatFill style={{ marginRight: 5 }} /> {data.nbrOfComments}
          </div>

          <div
            className="inline-flex items-baseline hover:text-red-400 rounded-lg duration-300 px-2"
            onClick={data.liked ? unlike : like}
          >
            {data.liked ? (
              <>
                <BsHeartFill style={{ marginRight: 5 }} />{" "}
                {data.nbrOfLikes}
              </>
            ) : (
              <>
                <BsHeart style={{ marginRight: 5 }} /> {data.nbrOfLikes}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
