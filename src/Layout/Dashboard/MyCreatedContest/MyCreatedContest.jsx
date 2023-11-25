import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Assuming you are using React Router for navigation
import { AuthContext } from "../../../providers/AuthProvider";
 

const MyCreatedContest = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [creatorContests, setCreatorContests] = useState([]);

  useEffect(() => {
    // Fetch creator's contests from the backend API
    // Replace the API endpoint with your actual endpoint
    fetch(`https://your-backend-url/getCreatorContests?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setCreatorContests(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email]);

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5  ">
      <h1 className="text-2xl font-bold text-center">My Created Contests</h1>
      {creatorContests.length === 0 ? (
        <p className="text-center">No contests created yet.</p>
      ) : (
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
                <td className="border dark-border-gray-700 p-2">{contest.contestName}</td>
                <td className="border dark-border-gray-700 p-2">{contest.status}</td>
                <td className="border dark-border-gray-700 p-2">
                  {contest.status === "pending" && (
                    <>
                      <Link to={`/edit-contest/${contest.id}`} className="mr-2">
                        Edit
                      </Link>
                      <button
                        // onClick={() => handleDeleteContest(contest.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {contest.status === "accepted" && (
                    <>
                      <Link to={`/contest-submissions/${contest.id}`} className="mr-2">
                        See Submissions
                      </Link>
                      <span className="text-gray-500">Edit/Delete Disabled</span>
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
