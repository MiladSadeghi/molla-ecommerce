import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, signInAnonymously, EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { handleFirebaseError } from "./Handle";

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

const signInWithGoogle = async (setSnackbar) => {
  const prevUserData = await GetPrevUserData();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      await update(ref(db, `users/${auth.currentUser.uid}`), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        ...prevUserData
      });
      setSnackbar({
        ...handleFirebaseError("golg"),
        open: true,
      })
    })
    .catch((error) => {
      console.log(error);
    });
};

export const registerWithUserAndPassword = async (inputs, setSnackbar) => {
  const prevUserData = await GetPrevUserData();
  await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
  await updateProfile(auth.currentUser, {
    displayName: inputs.userName
  })
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    uid: auth.currentUser.uid,
    displayName: inputs.userName,
    ...prevUserData
  });
  setSnackbar({
    ...handleFirebaseError("regd"),
    open: true,
  })
}

const LoginWithEmailAndPassword = async (inputs, setSnackbar) => {
  const credential = EmailAuthProvider.credential(inputs.email, inputs.password);
  const prevUserData = await GetPrevUserData();

  try {
    await linkWithCredential(auth.currentUser, credential);
    setSnackbar({
      ...handleFirebaseError("lgsc"),
      open: true,
    })
    AddToUser(prevUserData);

  } catch (error) {
    setSnackbar({
      ...handleFirebaseError(error.code),
      open: true,
    })
  }
}

const AnonymouslySignIn = async () => {
  await signInAnonymously(auth)
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    uid: auth.currentUser.uid,
  });
};

const GetUserWishList = async () => {
  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${auth.currentUser.uid}/wishlist`));
  return (data.exists() ? data.val() : [])
}

const AddToWishList = async (wishListArray) => {
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    "wishlist": wishListArray
  })
}

const GetUserCart = async () => {
  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${auth.currentUser.uid}/cart`));
  return (data.exists() ? data.val() : [])
}

const AddToCartList = async (cartListArray) => {
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    "cart": cartListArray
  })
}

const GetPrevUserData = async () => {
  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${auth.currentUser.uid}`));
  return {
    cart: data.val().cart || [],
    wishlist: data.val().wishlist || [],
  };
}

const AddToUser = async (Data) => {
  await update(ref(db, `users/${auth.currentUser.uid}`), {
    ...Data
  })
}

export { db, auth, signInWithGoogle, LoginWithEmailAndPassword, AnonymouslySignIn, GetUserWishList, AddToWishList, GetUserCart, AddToCartList }