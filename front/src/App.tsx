import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { setSocket, setWeb3Modal } from "./reducers/app.slice";
import { providerOptions } from "./utils/chain-provider";
import Web3Modal from "web3modal";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import Register from "./components/Register";
import { getAllPosts, me } from "./services/api";
import { initUser } from "./reducers/user.slice";
import { io } from "socket.io-client";
import { parseJwt } from "./utils/utils";
import { initPosts } from "./reducers/post.slice";
import PostPage from "./pages/PostPage";

function App() {
  const dispatch = useDispatch();

  const { web3Modal } = useSelector((state: any) => state.app);
  const { user } = useSelector((state: any) => state.user);

  const Layout = () => {
    return (
      <>
        <div className="top-header" />

        <div className="container mt-9 w-9/12 mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-2 border-r-2 border-gray-200 mr-4">
              <NavBar />
            </div>

            <div className="col-span-10">
              <Outlet />
            </div>
          </div>

          <ToastContainer position="top-center" hideProgressBar={true} />
        </div>
      </>
    );
  };

  const isAuthValid = () => {
    const jwt = window.localStorage.getItem("jwt");

    if (jwt != null || jwt != undefined) {
      const decodedJwt = parseJwt(jwt);

      if (decodedJwt.exp * 1000 >= Date.now()) {
        return true;
      }
    }

    window.localStorage.removeItem("jwt");
    return false;
  };

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    const jwt = window.localStorage.getItem("jwt");

    if (!jwt) {
      return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }

    return children;
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await me();

      const socket = io("http://localhost:3001/", {
        query: {
          token: window.localStorage.getItem("jwt"),
        },
      });

      await getPosts();

      dispatch(setSocket(socket));
      dispatch(initUser(data));
    } catch (e: any) {
      console.log(e.msg);
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await getAllPosts();

      dispatch(initPosts(data));
    } catch (e) {}
  };

  useEffect(() => {
    if (web3Modal == null) {
      dispatch(
        setWeb3Modal(
          new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions,
          })
        )
      );
    }

    getCurrentUser();
  }, []);

  if (!user?.username && isAuthValid()) {
    return <Register />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <RequireAuth>
              <PostPage />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
