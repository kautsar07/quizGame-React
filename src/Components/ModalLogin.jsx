import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyBLMseCPQ2XBZpXIGl2EngX0ynvBlMkVCg",
  authDomain: "quiz-game-6bb9f.firebaseapp.com",
  projectId: "quiz-game-6bb9f",
  storageBucket: "quiz-game-6bb9f.appspot.com",
  messagingSenderId: "338391154476",
  appId: "1:338391154476:web:0d1ee082e61aa7eda4b689",
  measurementId: "G-LVTY2DSYE3",
};

export default function ModalLogin(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      localStorage.setItem("photoURL", JSON.stringify(user.photoURL));
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      setTimeout(function () {
        window.location.reload(1);
      }, 50);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <GoogleOAuthProvider clientId="338391154476-70d0dnh5brh3v0psbdg8gacv7194eh6f.apps.googleusercontent.com">
      <Modal
        title="Login to your Account"
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button type="primary" onClick={props.handleOk}>
            Oke
          </Button>,
        ]}
      >
        <GoogleLogin
          style={{ borderRadius: "30px" }}
          onSuccess={signInWithGoogle}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Modal>
    </GoogleOAuthProvider>
  );
}
