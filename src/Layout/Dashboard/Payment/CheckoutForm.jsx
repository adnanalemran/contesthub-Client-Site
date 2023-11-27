import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [contest, setContest] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
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

  const price = contest?.contestPrice;
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error ", error);
      setError(error.message);
    } else {
      console.log("Payment method ", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmError");
    } else {
      console.log("Payment Intent ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: ` payment and Registration !`,
          showConfirmButton: false,
          timer: 1500,
        });


        // payment save database
        const payment = {
          email: user.email,
          price: price,
          date: new Date(),
          contestId: contest?._id,
          contestName: contest?.contestName,
          contestImage: contest?.image,
          transactionId: paymentIntent.id,
        };
        const res = await axiosSecure.post("payments", payment);
        console.log("payment save ",res);
        
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#FFFFFF",
              "::placeholder": {
                color: "#FFFFFF",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="mt-8 btn btn-sm btn-warning my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-400"> Your Transaction Id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
