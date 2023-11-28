import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const Analysis = () => {
  const { user } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState();
  useEffect(() => {
    axios
      .get(` http://localhost:5000/user/${user?.uid}`)
      .then((res) => {
        setDbuser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.uid]);
  const displayName = dbuser?.displayName;
  const displayPhotoURL = dbuser?.photoURL;
  return (
    <div>
      <h2 className="text-2xl font-bold lg:py-32">Wel come</h2>
      <p>Your Name : {displayName}</p>
      <p>Your Email : {user?.email}</p>
    </div>
  );
};

export default Analysis;
