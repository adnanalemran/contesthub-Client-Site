import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Submitted = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: creatorContests = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["creatorContests", email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/filtered-added-contest?email=${email}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });

  const handleMakeWin = (contest) => {
    axiosSecure.patch(`/contest/winning/${contest._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `  Win  !`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5">
      <h1 className="text-2xl font-bold text-center">My Submitted Contests</h1>

      {isLoading && <p className="text-center">Loading...</p>}

      {isError && (
        <p className="text-center text-red-500">Error fetching contests</p>
      )}

      {!isLoading && creatorContests.length === 0 && (
        <p className="text-center">No contests created yet.</p>
      )}

      {!isLoading && creatorContests.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border dark-border-gray-700 p-2">No</th>
              <th className="border dark-border-gray-700 p-2">Contest Name</th>
              <th className="border dark-border-gray-700 p-2">image</th>
              <th className="border dark-border-gray-700 p-2">Type</th>
              <th className="border dark-border-gray-700 p-2">
                Contest Deadline
              </th>
              <th className="border dark-border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {creatorContests.map((contest, index) => (
              <tr key={contest?._id ?? ""}>
                <td className="border dark-border-gray-700 p-2">{index + 1}</td>
                <td className="border dark-border-gray-700 p-2">
                  {contest?.contestName}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  <img
                    className="w-12 rounded-sm block mx-auto"
                    src={contest?.image}
                    alt=""
                  />
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest?.contestType}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest?.contestDeadline}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.winner === "running" && (
                    <>
                      <button
                        onClick={() => handleMakeWin(contest)}
                        className="btn btn-warning btn-sm mx-2"
                      >
                        make win
                      </button>
                    </>
                  )}
                  {contest.winner === "winner" && (
                    <>
                      <p>winner selected</p>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Submitted;
