import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hook/useAxiosPublic";
 
const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
        }
        else {
            // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
            localStorage.removeItem('access-token');
            setLoading(false);
        }
       
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])

  const userInfo = {
    user,
    loading,
    createUser,
    logOut,
    signIn,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
