import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

import axios from "axios";
import { Helmet } from "react-helmet";
const PayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contest, setContest] = useState({});
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const email = user?.email;

  const [dbuser, setDbuser] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${user?.uid}`)
      .then((res) => {
        setDbuser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.uid]);

  const displayName = user?.displayName || dbuser?.displayName;

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Add to cart success",
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
    });
  };



  const handleBuy = async () => {
    const updateStock = {
      orderCount: contest.orderCount + 1,
      Quantity: contest.Quantity - 1,
      name: contest.name,
      image: contest.image,
      Category: contest.Category,
      chiefNames: contest.chiefNames,
      foodOrigin: contest.foodOrigin,
      price: contest.price,
      shortDescription: contest.shortDescription,
      AddedBy: contest.AddedBy,
    };



    
    try {
      if (contest?.Quantity <= 0) {
        setErrorMessage("This item is stock out ");
        return;
      } else if (contest.email === email) {
        setErrorMessage("You can't purchase your own added food items.");
        return;
      }  else if (dbuser?.userOrderCount >= 20) {
        setErrorMessage("A user cannot buy more than 20 food items");
        return;
      } else {
        const response = await fetch(
          `http://localhost:5000/contest/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStock),
          }
        );

        if (response.ok) {
          const buyItem = {
            food: contest,
            email: email,
          };
          const updateOrderCount = dbuser?.userOrderCount + 1;

          const formData = {
            userOrderCount: updateOrderCount,
          };
        console.log(formData)
          axios
            .put(`http://localhost:5000/user/update/${user?.uid}`, formData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.error("Error updating user data:", error);
            });




          fetch("http://localhost:5000/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buyItem),
          })
            .then((res) => res.json())
            .then(() => {
              showSuccessAlert();
              // Navigate after success
              if (location?.state) {
                navigate(location.state);
              } else {
                navigate("/all-food");
              }
            })
            .catch((error) => {
              console.error(error);
              showErrorAlert(error.message);
            });
        } else {
          const data = await response.json();
          showErrorAlert(data.error);
        }
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/contest/${id}`)
        .then((response) => response.json())
        .then((data) => setContest(data))
        .catch((error) =>
          console.error("Error fetching product data: ", error)
        );
    }
  }, [id]);

  return (
    <div className="my-16">
      <Helmet>
        <title>Contest hub || Order page</title>
      </Helmet>
      <div className="flex flex-col max-w-lg p-6 space-y-4 divide-y mx-auto">
        <h2 className="text-3xl font-semibold">Order items</h2>

        <ul className="flex flex-col pt-4 space-y-2">
          <li className="flex items-start justify-between">
            <div className="text-xl">Item Name :</div>
            <div className="text-right">
              <span className="block text-xl">{contest?.name}</span>
            </div>
          </li>
          <li className="flex items-start justify-between">
            <h3>Item price:</h3>
            <div className="text-right">
              <span className="block">${contest?.price}</span>
            </div>
          </li>
          <li className="flex items-start justify-between">
            <h3>Active Quantity:</h3>
            <div className="text-right">
              <span className="block">{contest?.Quantity}</span>
            </div>
          </li>
          <li className="flex items-start justify-between">
            <h3>orderCount:</h3>
            <div className="text-right">
              <span className="block">{contest?.orderCount}</span>
            </div>
          </li>
        </ul>
        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>who added (Email) : </span>
            <span> {contest?.email} </span>
          </div>
          <div>
            <div className="flex justify-between">
              <span>Buyer name : </span>
              <span> {displayName}</span>
            </div>
            <div className="flex justify-between">
              <span>Buyer total buy : </span>
              <span> {dbuser?.userOrderCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Buyer Email : </span>
              <span> {email} </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Buying Date: </span>
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="pt-4 space-y-2">
          <div className="space-y-6">
            <div className="flex justify-between">
              <span>Payable</span>
              <span className="font-semibold">${contest?.price}</span>
            </div>
            {errorMessage && (
              <p className="text-red-500 font-semibold">{errorMessage}</p>
            )}
            <button
              onClick={handleBuy}
              type="button"
              className="w-full py-2 font-semibold border rounded dark-bg-violet-400 dark-text-gray-900 dark-border-violet-400"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default PayPage;