import axios from "axios";
import React, { useEffect, useState } from "react";

const TopCreator = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/creator/top3`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <div className="pt-32 pb-2">
        <h4 className="text-2xl text-blue-500 text-center">Top #3 Creators</h4>
        <h2 className="text-5xl font-bold text-center">Top Contest Creators</h2>

        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mt-16">
          {users.map((user) => (
            <div
              key={user._id}
              className="max-w-xs  bg-[#212472] border p-4 rounded-lg shadow-md mx-4"
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-32 h-32 mx-auto mb-4 object-cover rounded-full"
              />
              <h3 className="text-xl  font-semibold text-center mb-2">
                {user.displayName}
              </h3>

              <p className="text-gray-300 text-center mb-4">
                Contests Created: {user.createCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCreator;
