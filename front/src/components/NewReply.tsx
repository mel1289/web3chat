import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPost } from "../reducers/post.slice";
import { newComment, newPost } from "../services/api";

const NewReply = ({ id }: any) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const { socket } = useSelector((state: any) => state.app);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const submit = async () => {
    try {
      const { data } = await newComment(id, value);

      // dispatch(addPost(data));
      setValue("");
      toast.success("Tweet published!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-wrap justify-end rounded-lg border border-gray-200 mb-2">
        <textarea
          className="w-full p-2 rounded-lg outline-none resize-none"
          placeholder="What's happening?"
          value={value}
          onChange={handleChange}
        />

        <div className="flex items-baseline">
          <div className="mr-4">{value.length} characters</div>
          <div>
            <button
              className="w-36 bg-violet-500 text-white font-bold py-2 px-2 rounded-full disabled:opacity-50 mt-2"
              disabled={value.length ? false : true}
              onClick={submit}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReply;
