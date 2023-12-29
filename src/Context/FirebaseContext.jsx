import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import AbsoluteSpinner from "../Components/Utils/AbsoluteSpinner";
import { doc, setDoc } from "firebase/firestore";

function isGoogleProvider(user) {
  if (user && user.providerData && Array.isArray(user.providerData)) {
    return user.providerData.some(
      (provider) => provider.providerId === "google.com"
    );
  }
  return false;
}

async function updateUserDoc(user) {
  if (!user || !user.email) return;
  const userDoc = doc(db, "users", user.email);
  try {
    await setDoc(userDoc, {
      ...user,
    });
  } catch (error) {
    throw error;
  }
}

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (!user) return;
      try {
        await updateUserDoc({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
        });
      } catch (error) {
        console.log("Error while upserting the user", error.message);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [user, setUser]);

  const signUp = async (userName, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      await sendEmailVerification(auth.currentUser, {
        url: import.meta.env.VITE_REACT_APP_URL,
      });
    } catch (error) {
      throw error;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = () => {
    return signOutFirebase(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const facebookSignIn = () => {
    return signInWithPopup(auth, new FacebookAuthProvider());
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  if (user === undefined) {
    return <AbsoluteSpinner />;
  }

  const isVerified = user && (user.emailVerified || isGoogleProvider(user));

  return (
    <FirebaseContext.Provider
      value={{
        user,
        db,
        signUp,
        signIn,
        signOut,
        googleSignIn,
        facebookSignIn,
        passwordReset,
        isVerified,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
