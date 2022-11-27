import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firabase";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="tittle">giriş yap</span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="şifre"/>
            <input style={{display:"none"}} type="file" id="file"/>
            <button>giriş yap</button>
            {err && <span>bişeyler yanlış gitti</span>}
        </form>
            <p>hesabın yoksa <Link to="/register"> kayıt ol</Link></p>
      </div>
    </div>
  );
};

export default Login;