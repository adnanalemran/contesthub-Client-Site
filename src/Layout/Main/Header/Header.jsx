import { Link, NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  const menu = (
    <>
      <li className="flex">
        <NavLink
          to="/"
          className="flex items-center px-4 mb-1 border-b-2 hover:text-[#0ECDB9] hover:border-[#0ECDB9]"
        >
          Home
        </NavLink>
      </li>
      <li className="flex">
        <NavLink
          to="/All-Contest"
          className="flex items-center px-4 mb-1 border-b-2 transition  delay-100 hover:text-[#0ECDB9] hover:border-[#0ECDB9]"
        >
         All Contest
        </NavLink>
      </li>
      <li className="flex">
        <NavLink
          to="/about"
          className="flex items-center px-4 mb-1 border-b-2 hover:text-[#0ECDB9] hover:border-[#0ECDB9]"
        >
          About
        </NavLink>
      </li>
    </>
  );
  const user = 0;
  return (
    <div>
      <header className="p-4 bg-[#1B1D4D] shadow-lg poppins-font text-white">
        <div className="container flex justify-between h-16 mx-auto">
          <Link>
            <img className=" w-52" src="./logo.png" alt="" />
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex font-bold">
            {menu}
          </ul>

          <div className="items-center flex-shrink-0 hidden lg:flex">
            <div className="navbar-end lg:flex">
              {user ? (
                <>
                  <ul className="menu menu-horizontal px-1 flex  items-center justify-center">
                    <li tabIndex={0}>
                      <details>
                        <summary>
                          <label
                            tabIndex={0}
                            className="btn btn-ghost  btn-circle avatar"
                          >
                            <div className="w-10 rounded-full">
                              {/* <img src={displayPhotoURL} alt={displayName} /> */}
                            </div>
                          </label>
                          <p className="hidden md:grid">
                            {/* {displayName} */}
                          </p>
                        </summary>

                        <ul className="p-2 w-48 bg-gray-950">
                          <li>
                            <Link to="/my-added-product">Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/add-food-item">Add a Food Item</Link>
                          </li>
                          <li>
                            <Link to="/my-order-food-item">
                              My Order Food Item
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <button
                      //   onClick={handleSignOut}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul className="  px-1">
                    <li>
                      <Link className="btn bg-[#0ECDB9] border-none" to="/login">Login</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="dropdown p-4 lg:hidden ">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu text-2xl shadow menu-sm dropdown-content right-1 mt-3 z-[5] p-3 gap-4  rounded-box w-52 bg-[#1B1D4D]"
            >
              {menu}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
