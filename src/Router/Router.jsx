import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import AllContest from "../Page/All-Contest/AllContest";
import Home from "../Page/Home/Home";

import AddContest from "../Layout/Dashboard/AddContest/AddContest";
import Analysis from "../Layout/Dashboard/Analysis/Analysis";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageContest from "../Layout/Dashboard/ManageContest/ManageContest";
import ManageUser from "../Layout/Dashboard/ManageUser/ManageUser";
import MyCreatedContest from "../Layout/Dashboard/MyCreatedContest/MyCreatedContest";
import MyWinning from "../Layout/Dashboard/MyWinning/MyWinning";
import Payment from "../Layout/Dashboard/Payment/Payment";
import Registered from "../Layout/Dashboard/Registered/Registered";
import Submitted from "../Layout/Dashboard/Submitted/Submitted";
import UpdateContest from "../Layout/Dashboard/UpdateContest/UpdateContest";
import SignIn from "../Layout/REG/SignIn";
import SignUp from "../Layout/REG/SignUp";
import ContestDetails from "../Page/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import Page404 from "../Page/Error/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement:<Page404/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/All-Contest",
        element: <AllContest />,
        loader: () => fetch("https://b8a12-server-side-adnanalemran.vercel.app/contestCount"),
      },

      {
        path: "/contest/:id",
        element: (
          
            <ContestDetails />
          
        ),
      },
      {
        path: "/contest/registration/:id",
        element: <PrivateRoute> <Payment /></PrivateRoute>,
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

    element:<PrivateRoute> <Dashboard /> </PrivateRoute>,
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
        path: "/Dashboard/myWinning",
        element: <MyWinning />,
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
            `https://b8a12-server-side-adnanalemran.vercel.app/contest/${params.id}`
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
