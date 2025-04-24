import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router";
function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const navigate = useNavigate();
  async function handleLogout() {
    signOut(auth)
      .then(() => {
        alert("Signout Successfull");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleFile(e) {
    e.preventDefault();
    console.log("File Management");
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ color: "red" }}>
        Logout
      </button>
      <br />
      <hr />

      <form action="">
        <label for="File">File</label>
        <br />
        <input type="file" onChange={handleFile} />
      </form>
    </div>
  );
}

export default Dashboard;
