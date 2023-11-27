import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import Header from "../Main/Header/Header";
import "./style.css";
import useAdmin from "../../hook/useAdmin";
import useController from "../../hook/useController";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(` http://localhost:5000/user/${user?.uid}`)
      .then((res) => {
        setDbuser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.uid]);

  const displayName = user?.displayName || dbuser?.displayName;
  const displayPhotoURL = dbuser?.photoURL || user?.photoURL;

  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  const [isAdmin] = useAdmin();

  const [isControl] = useController();

  return (
    <div className="bg-[#090539]">
      <Header />
      <div
        className="h-[300px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://pixner.net/egamlio/main/assets/images/dashboard-banner-bg.png)",
        }}
      >
        <div className="container mx-auto">
          <p>Welcome,</p>
          <h2 className="text-4xl font-bold py-4 lg:py-8 text-left text-white capitalize">
            {isAdmin ? (
              <>ADMIN DASHBOARD,</>
            ) : isControl ? (
              <> Control DASHBOARD,</>
            ) : (
              <> USER DASHBOARD,</>
            )}
          </h2>
        </div>
      </div>

      <div className="flex w-full container mx-auto  gap-12 ">
        <div className="w-1/3   sticky top-10">
          <div className="justify-around p-8 gap-9 text-center rounded-lg lg:-mt-32 bg-[#212472] w-full mx-4 ">
            <img
              src={displayPhotoURL}
              alt=""
              className="  h-44 mx-auto rounded-full aspect-square"
            />
            <div className="space-y-4 text-center divide-y">
              <div className="my-4 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl text-white">
                  {displayName}
                </h2>
              </div>
              <button onClick={handleSignOut} className="btn btn-info  px-8">
                Log Out
              </button>
            </div>
          </div>
          <div className="justify-around p-8 gap-9 text-center rounded-lg  my-8 bg-[#212472] w-full mx-4 g ">
            <div className=" flex flex-col gap-4">
              {isAdmin ? (
                <>
              

                  <NavLink to="/Dashboard/ManageUser">
                    <li className="btn   btn-primary text-white  w-full">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-3.png"
                        alt=""
                      />
                      Manage User
                    </li>
                  </NavLink>
                  <NavLink to="/Dashboard/ManageContest">
                    <li className="btn   btn-primary text-white  w-full">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
                        alt=""
                      />
                      Manage Contest
                    </li>
                  </NavLink>
                </>
              ) : isControl ? (
                <>
                  <NavLink to="/Dashboard">
                    <li className="btn  btn-primary text-white  w-full border-none">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-1.png"
                        alt=""
                      />
                      Dashboard
                    </li>
                  </NavLink>
                  <NavLink to="/Dashboard/AddContest">
                    <li className="btn   btn-primary text-white  w-full">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
                        alt=""
                      />
                      Add Contest
                    </li>
                  </NavLink>
                  <NavLink to="/Dashboard/MyCreatedContest">
                    <li className="btn   btn-primary text-white  w-full">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
                        alt=""
                      />
                      My Created Contest
                    </li>
                  </NavLink>
                  <NavLink to="/Dashboard/Submitted">
                    <li className="btn   btn-primary text-white  w-full">
                      <img
                        src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
                        alt=""
                      />
                      Contest Submitted Page
                    </li>
                  </NavLink>
                </>
              ) : ( <>

              
                <NavLink to="/Dashboard/Submitted">
                  <li className="btn   btn-primary text-white  w-full">
                    <img
                      src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-3.png"
                      alt=""
                    />
                 My Profile
                  </li>
                </NavLink>
                <NavLink to="/Dashboard/Submitted">
                  <li className="btn   btn-primary text-white  w-full">
                    <img
                      src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
                      alt=""
                    />
                    My Registered Contest
                  </li>
                </NavLink>
                <NavLink to="/Dashboard/Submitted">
                  <li className="btn   btn-primary text-white  w-full">
                    <img
                      src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-1.png"
                      alt=""
                    />
                     My Winning Contest Page
                  </li>
                </NavLink>

                
              </>)}
            </div>
          </div>
        </div>
        <div className="w-2/3 sticky  ">
          <div className="w-full justify-around p-8 gap-9 text-center rounded-lg lg:-mt-32 bg-[#212472]  ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
