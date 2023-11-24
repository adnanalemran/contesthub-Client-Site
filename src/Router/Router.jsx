import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Page/Home/Home";

const router = createBrowserRouter([{ 
    path: "/",
    element: <Main />,
    children:[
        {
            path: "/",
            element: <Home />,
          },
    ]
 }]);
export default router;