import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../hook/useAxiosPublic";
const axiosPublic = useAxiosPublic();

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Sign in success",
  });
};

const showErrorAlert = (error) => {
  Swal.fire({
    icon: "error",
    title: "login unsuccessful ",
    text: error,
  });
};

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { googleSignIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };

        axiosPublic.post("/user", userInfo).then((res) => {
          console.log(res.data);
          navigate(location?.state ? location.state : "/");
        });

        showSuccessAlert();
 
      })

      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          showErrorAlert("Email or password is incorrect.");
        } else {
          showErrorAlert(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      const user = {
        uid: result.user?.uId,
        email: result.user?.email,
        photoURL: result.user?.photoURL,
        displayName: result.user?.displayName,
      };
      fetch(" http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          showSuccessAlert();
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          console.log(error);
          showErrorAlert(error.message);
        });
    });
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(https://pixner.net/egamlio/main/assets/images/login-reg-bg.png)",
      }}
      className="py-8  min-h-screen"
    >
      <Helmet>
        <title>ContestHub || Login page</title>
      </Helmet>
      <Link to="/">
        <div className="w-52 mx-auto py-1">
          <img src="./logo.png" alt="" />
        </div>
      </Link>
      <div className=" bg-[#090539] w-full  mx-auto max-w-md p-8 py-16 space-y-3 rounded-xl border my-5  ">
        <h1 className="text-2xl font-bold text-center pb-2">Sign In</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1 text-sm">
            <label className="block dark:text-gray-400">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="block dark:text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <button className="block w-full p-3 text-center rounded-xl dark:text-gray-900 dark:bg-violet-400 btn btn-primary">
            Sign in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1   bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1   bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignIn}
            aria-label="Log in with Google"
            className="p-3 w-full rounded-sm flex align-middle justify-center   btn  gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p> sign in with google</p>
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 dark:text-gray-400">
          Don't have an account?
          <Link
            rel="noopener noreferrer"
            to="/signUp"
            className="underline px-2 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
