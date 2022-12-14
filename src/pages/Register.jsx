import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BsImageFill } from "react-icons/bs";
import { auth, db, storage } from "../firabase";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            navigate("/");
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="tittle">kay??t ol</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="kullan??c?? ad??" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="??ifre" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <BsImageFill size={30} />
            <span>avatar ekle</span>
          </label>
          <button>kay??t ol</button>
          {loading && "resim y??kleniyor l??tfen beklee..."}
          {err && <span>bir??eyler yanl???? gitti</span>}
        </form>
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          hesab??n varsa giri?? yap
        </p>
      </div>
    </div>
  );
};

export default Register;
