import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { handleFirebaseError } from "../sections/Navbar/Handle";

const firebaseConfig = {
  apiKey: "AIzaSyCHeejRBZa7afv2hlf8250q7iz874UFFro",
  authDomain: "shop-8b88e.firebaseapp.com",
  databaseURL: "https://shop-8b88e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shop-8b88e",
  storageBucket: "shop-8b88e.appspot.com",
  messagingSenderId: "940500852091",
  appId: "1:940500852091:web:13d25a31c8d762d8fdb1de",
  measurementId: "G-ESD5F03C8V",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = (event) => {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      set(ref(db, `users/${result.user.uid}`), {
        uid: result.user.uid,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


export const registerWithUserAndPassword = async (inputs, setSnackbar) => {
  await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
  await updateProfile(auth.currentUser, {
    displayName: inputs.userName
  })
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    uid: auth.currentUser.uid,
    displayName: inputs.userName
  });
  setSnackbar({
    ...handleFirebaseError("regd"),
    open: true,
  })
}

const LoginWithEmailAndPassword = async (inputs, setSnackbar) => {
  await signInWithEmailAndPassword(auth, inputs.email, inputs.password)
  setSnackbar({
    ...handleFirebaseError("lgsc"),
    open: true,
  })
}

export { db, auth, signInWithGoogle, LoginWithEmailAndPassword }