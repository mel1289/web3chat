import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setWalletConnected, setWeb3 } from "../reducers/app.slice";
import { formatWalletAddress } from "../utils/utils";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { web3Modal } = useSelector((state: any) => state.app);
  const { user } = useSelector((state: any) => state.user);

  const logout = async () => {
    await web3Modal.clearCachedProvider();
    dispatch(setWeb3(null));
    dispatch(setWalletConnected(null));
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <div>
        <p className="text-2xl font-bold text-violet-900">{user?.username}</p>
        <p className="text-xs text-gray-600">
          @{formatWalletAddress(user?.wallet)}
        </p>
      </div>

      <hr className="mt-4 mb-4" />

      <ul className="text-lg">
        <li className="text-2xl mb-2">
          <Link to="/">Home</Link>
        </li>
        <li className="text-2xl mb-2">
          <Link to="/profil">Profil</Link>
        </li>
        <li className="text-2xl mb-2">
          <Link to="/conversations">Messages</Link>
        </li>

        <button
          className="w-10/12 bg-violet-900 text-white text-xs font-bold py-2 px-2 rounded-full mt-2"
          onClick={logout}
        >
          Logout
        </button>
      </ul>
    </>
  );
};

export default NavBar;
