import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [contest, setContest] = useState({});
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
    <div className="container mx-auto">
      <h2 className="py-4 text-3xl text-center font-bold">
        Payment for registration
      </h2>

      <div className=" border rounded lg:w-1/2 w-full mx-auto py-4  px-4">
        <p className="text-xl font-bold">
          Contest Name : {contest?.contestName}
        </p>
        <p className="  ">
          Contest Entry Price : {contest?.contestPrice} tk
        </p>
        <hr className="mx-auto py-2" />
        <p>Your Email : {user?.email}</p>
        <p>Your id : {user?.uid}</p>
        <hr className="mx-auto py-2" />
        <p>Current Date: {currentDate}</p>
        <p>Contest Date: {contest?.contestDeadline}</p>
        <hr className="mx-auto py-8" />
        <div className="border p-4 rounded-lg text-white">
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
