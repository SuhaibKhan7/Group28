import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  function handlelogin(e) {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        setMessage(errorMessage);
        console.log(error);
        if (message == "auth/invalid-credential")
          setMessage("Invalid email or password");
      });
  }
  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        setMessage(errorMessage);
      });
  }

  return (
    <div>
      <h3>Login</h3>

      <form action="" onSubmit={handlelogin}>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: "orange" }}>{message}</p>}

      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
}

export default Login;
