import {onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile} from 'firebase/auth'
import {createContext, useEffect, useState} from 'react'
import {auth} from "../services/firebase"
import PropTypes from "prop-types";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider);
    }

    async function registerWithEmailAndPassword(email, password, displayName) {

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Update user displayName
            await updateProfile(user, {
                displayName: displayName,
            });
            return user;
        }



    async function loginWithEmailAndPassword( email, password) {
        // can also do this way
        // return signInWithEmailAndPassword(auth,email,password);
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        return userCredential.user;
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            }
            else{
                setUser(null)
            }
            setLoading(false)
        })

    },[])
    return (
<AuthContext.Provider value={{user,signInWithGoogle,loading,logOut, registerWithEmailAndPassword, loginWithEmailAndPassword}}>{children}</AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}



