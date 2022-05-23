import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from "../firebase";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        setIsAuth(localStorage.getItem("isAuth") === "true")

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <UserContext.Provider value={{ createUser, logout, signIn, user, isAuth, setIsAuth, forgotPassword }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}