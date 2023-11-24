import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Page/Home/Home";
import AllContest from "../Page/All-Contest/AllContest";
 
import SignIn from "../Layout/REG/SignIn";
import SignUp from "../Layout/REG/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, {
        path: "/All-Contest",
        element: <AllContest />,
      },
    ],
  },
  {
    path:"/login",
    element:<SignIn/>
  }  ,{
    path:"/signUp",
    element:<SignUp/>
  }
]);
export default router;
