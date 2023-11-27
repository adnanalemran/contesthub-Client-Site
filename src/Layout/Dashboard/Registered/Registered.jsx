import React from "react";
import { useContext } from "react";

import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Registered = () => {
  const { user } = useAuth();
  console.log(user)
  const axiosSecure = useAxiosSecure();

  // Use React Query to fetch payment data
  const { data: payments, isLoading, isError } = useQuery({
    queryKey: ["payment", user.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching payment data");
      }
    },
  });

  return (
    <div>
      <h2 className="text-3xl">Registered contest </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading payment data</p>
      ) : (<>
        <p>Total payment: {payments?.length}</p>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
              <th>Contest ID</th>
              <th>Contest Name</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.email}</td>
                <td>{payment.price}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>{payment.contestId}</td>
                <td>{payment.contestName}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
</>
      )}
    </div>
  );
};

export default Registered;
