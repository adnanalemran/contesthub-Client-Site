import React from 'react';
import useAuth from '../../../hook/useAuth';

const UseHome = () => {
    const { user } = useAuth();
    return (
        <div>
       
        <h2> Welcome User</h2>
        {user?.displayName ? user?.displayName : "welcome User"}
      </div>
    );
};

export default UseHome;