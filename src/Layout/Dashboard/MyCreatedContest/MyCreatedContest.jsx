import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useContext } from "react";

const MyCreatedContest = () => {
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

  const handleDeleteContest = (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contest/${contest._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5">
      <h1 className="text-2xl font-bold text-center">My Created Contests</h1>

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
              <th className="border dark-border-gray-700 p-2">Contest Name</th>
              <th className="border dark-border-gray-700 p-2">Status</th>
              <th className="border dark-border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {creatorContests.map((contest) => (
              <tr key={contest?._id ?? ""}>
                <td className="border dark-border-gray-700 p-2">
                  {contest.contestName}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.status}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.status === "pending" && (
                    <>
                      <Link to={`/Dashboard/contest/update/${contest?._id}`}>
                        <button className="btn btn-warning btn-sm">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteContest(contest)}
                        className="btn btn-error btn-sm mx-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {contest.status === "Approve" && (
                    <>
                      <Link
               to={`/contest/${contest?._id}`}
                        className="mr-2 btn btn-sm"
                      >
                        See contest
                      </Link>
                      
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

export default MyCreatedContest;
