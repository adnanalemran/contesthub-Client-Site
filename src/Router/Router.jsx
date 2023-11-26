import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Page/Home/Home";
import AllContest from "../Page/All-Contest/AllContest";

import SignIn from "../Layout/REG/SignIn";
import SignUp from "../Layout/REG/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Analysis from "../Layout/Dashboard/Analysis/Analysis";
import AddContest from "../Layout/Dashboard/AddContest/AddContest";
import MyCreatedContest from "../Layout/Dashboard/MyCreatedContest/MyCreatedContest";
import ContestDetails from "../Page/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/All-Contest",
        element: <AllContest />,
        loader: () => fetch("http://localhost:5000/contestCount"),
      },

      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contest/registration/:id",
        element: (
          // <OrderPage />
          <div className="we"></div>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/Dashboard",
        element: <Analysis />,
      },
      {
        path: "/Dashboard/AddContest",
        element: <AddContest />,
      },
      {
        path: "/Dashboard/MyCreatedContest",
        element: <MyCreatedContest />,
      },
      {
        path: "/Dashboard/ContestSubmittedPage",
        element: <MyCreatedContest />,
      },
    ],
  },
]);
export default router;
