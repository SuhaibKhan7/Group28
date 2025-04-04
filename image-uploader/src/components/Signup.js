import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User Created..");
        navigate("/login");
        // ...
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
  return (
    <div>
      <h3>Signup</h3>

      <form action="" onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
      {message && <p style={{ color: "orange" }}>{message}</p>}
    </div>
  );
}

export default Signup;
