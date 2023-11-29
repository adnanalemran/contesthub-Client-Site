import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

 
const Main = () => {
    return (
        <div className="max-w-7xl mx-auto overflow-hidden ">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;