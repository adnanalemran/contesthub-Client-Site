import { Outlet } from "react-router-dom";

 
const Main = () => {
    return (
        <div>
            nav
            <Outlet/>
            footer
        </div>
    );
};

export default Main;