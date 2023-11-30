import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { initUser } from "../reducers/user.slice";
import { updateUsername } from "../services/api";

const Register = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const submit = async () => {
    try {
      const { data } = await updateUsername(value);
      dispatch(initUser(data));
    } catch (e: any) {
      if (e.response.status == 409) {
        toast.error("Username already used!");
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <>
      <div className="top-header" />

      <div className="container mt-9 w-4/12 mx-auto">
        <div className="p-6 bg-white rounded-lg border border-gray-200 mb-2">
          <div className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Welcome to our app!
          </div>
          <p className="font-normal text-gray-700">
            Please choose an username to continue.
          </p>

          <hr className="mt-4 mb-4" />

          <input
            className="w-full p-4 mb-2 border border-gray-200 rounded-lg outline-none resize-none"
            placeholder="Elon Musk"
            value={value}
            onChange={handleChange}
          />

          <button
            className="w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full duration-300 mt-2 disabled:opacity-25"
            disabled={value.length ? false : true}
            onClick={submit}
          >
            Submit
          </button>
        </div>

        <ToastContainer position="top-center" hideProgressBar={true} />
      </div>
    </>
  );
};

export default Register;
