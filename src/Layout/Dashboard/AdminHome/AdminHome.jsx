import React from "react";
import useAuth from "../../../hook/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
       
      <h2> Welcame admin</h2>
      {user?.displayName ? user?.displayName : "wlcome ADMIN"}
    </div>
  );
};

export default AdminHome;
