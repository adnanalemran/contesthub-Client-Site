import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const MyCreatedContest = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [creatorContests, setCreatorContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/filtered-added-contest?email=${email}`, {
        withCredentials: true,
      })
      .then((response) => {
        setCreatorContests(response.data);

        setLoading(false);
      });
  }, [email]);

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5">
      <h1 className="text-2xl font-bold text-center">My Created Contests</h1>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && creatorContests.length === 0 && (
        <p className="text-center">No contests created yet.</p>
      )}

      {!loading && creatorContests.length > 0 && (
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
              <tr key={contest.id}>
                <td className="border dark-border-gray-700 p-2">
                  {contest.contestName}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.status}
                </td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.status === "pending" && (
                    <>
                      <Link to={`/edit-contest/${contest.id}`} className="mr-2">
                        Edit
                      </Link>
                      {/* Uncomment the line below when you implement delete functionality */}
                      {/* <button onClick={() => handleDeleteContest(contest.id)} className="text-red-600">Delete</button> */}
                    </>
                  )}
                  {contest.status === "accepted" && (
                    <>
                      <Link
                        to={`/contest-submissions/${contest.id}`}
                        className="mr-2"
                      >
                        See Submissions
                      </Link>
                      <span className="text-gray-500">
                        Edit/Delete Disabled
                      </span>
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
