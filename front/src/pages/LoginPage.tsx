import ConnectWallet from "../components/ConnectWallet";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = window.localStorage.getItem("jwt");

    if (jwt) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mt-9 w-4/12 mx-auto">
      <div className="p-6 bg-white rounded-lg border border-gray-200 mb-2">
        <div className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Welcome!
        </div>
        <p className="font-normal text-gray-700">
          Please connect your wallet to access the app.
        </p>

        <hr className="mt-4 mb-4" />

        <ConnectWallet />
      </div>

      <ToastContainer position="top-center" hideProgressBar={true} />
    </div>
  );
};

export default LoginPage;
