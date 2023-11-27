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
import ManageUser from "../Layout/Dashboard/ManageUser/ManageUser";
import ManageContest from "../Layout/Dashboard/ManageContest/ManageContest";
import UpdateContest from "../Layout/Dashboard/UpdateContest/UpdateContest";
import Payment from "../Layout/Dashboard/Payment/Payment";
import Submitted from "../Layout/Dashboard/Submitted/Submitted";
import Registered from "../Layout/Dashboard/Registered/Registered";

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
        element: <Payment />,
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

      //admin routes
      {
        path: "/Dashboard/ManageUser",
        element: <ManageUser />,
      },
      {
        path: "/Dashboard/ManageContest",
        element: <ManageContest />,
      },

      //controller routes
      {
        path: "/Dashboard/AddContest",
        element: <AddContest />,
      },
      {
        path: "/Dashboard/MyCreatedContest",
        element: <MyCreatedContest />,
      },
      {
        path: "/Dashboard/Submitted",
        element: <Submitted />,
      },
      {
        path: "/Dashboard/Registered",
        element: <Registered />,
      },
      {
        path: "/Dashboard/contest/update/:id",
        element: <UpdateContest />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/contest/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch food data for updating");
          }
          const data = await response.json();
          return data;
        },
      },
    ],
  },
]);
export default router;
