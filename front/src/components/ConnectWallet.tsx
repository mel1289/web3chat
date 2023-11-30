import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, setWalletConnected, setWeb3 } from "../reducers/app.slice";
import { toast } from "react-toastify";
import { useState } from "react";
import { getAuthNonce, me, verifyAuthSignature } from "../services/api";
import { useNavigate } from "react-router-dom";
import { initUser } from "../reducers/user.slice";
import { io } from "socket.io-client";

const ConnectWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { web3Modal } = useSelector((state: any) => state.app);

  const provider_event = (provider: any) => {
    provider.on("accountsChanged", () => {
      logout();
      window.location.reload();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", () => {
      logout();
      window.location.reload();
    });

    // Subscribe to provider connection
    provider.on("connect", () => {});

    // Subscribe to provider disconnection
    provider.on("disconnect", () => {
      logout();
      window.location.reload();
    });
  };

  const logout = async () => {
    await web3Modal.clearCachedProvider();
    dispatch(setWeb3(null));
    dispatch(setWalletConnected(null));
  };

  const connect = async () => {
    try {
      setLoading(true);
      const provider = await web3Modal.connect();

      provider_event(provider);

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      const { data } = await getAuthNonce(accounts[0]);

      const signature = await web3.eth.personal.sign(
        data.message,
        accounts[0],
        ""
      );

      const authToken: any = await verifyAuthSignature(
        data.tmpToken,
        signature
      );

      localStorage.setItem("jwt", authToken.data.token);

      const socket = io("http://localhost:3001/", {
        query: {
          token: authToken.data.token,
        },
      });

      const user = await me();

      dispatch(initUser(user.data));
      dispatch(setWeb3(web3));
      dispatch(setWalletConnected(accounts[0]));
      dispatch(setSocket(socket));

      toast.success("Connected!");

      navigate("/");
    } catch (e: any) {
      if (e.code == "ERR_BAD_REQUEST" || e.code == "ERR_FORBIDDEN") {
        toast.error("Bad signature.");
      } else {
        toast.error("An error occurred.");
      }

      setLoading(false);
      logout();
    }
  };

  return (
    <button
      className="w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full duration-300 mt-2 disabled:opacity-25"
      onClick={connect}
      disabled={loading}
    >
      Connect wallet
    </button>
  );
};

export default ConnectWallet;
