import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login"
import Register from "../Pages/Register";
import CodingRoom from "../Pages/CodingRoom";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout"
import ConnectionLayout from "../layouts/ConnectionLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path : "/register",
    element: <Register />,
  },
  {
    path : "/home",
    element: <HomeLayout />,
  },
  {
    path : "/profile",
    element: <ProfileLayout />,
  },
  {
    path : "/connections",
    element: <ConnectionLayout />,
  },
  {
    path : "/coding-room",
    element: <CodingRoom />,
  },
]);