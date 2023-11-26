import React from 'react';
import useAuth from '../../../hook/useAuth';

const UseHome = () => {
    const { user } = useAuth();
    return (
        <div>
       
        <h2> Welcame User</h2>
        {user?.displayName ? user?.displayName : "wlcome User"}
      </div>
    );
};

export default UseHome;