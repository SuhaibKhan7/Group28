import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  //websockets

  const socket = new WebSocket("ws://localhost:3000");
  socket.addEventListener("open", (event) => {
    console.log("Websocket connected to 3000");
    // toast.info("WebSocket Connected");
  });
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log(data.message);
    // toast.info(data.message);
  });

  useEffect(() => {
    const q = query(collection(db, "uploads"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imageurls = [];
      querySnapshot.forEach((doc) => {
        imageurls.push({ id: doc.id, ...doc.data() });
      });
      setImages(imageurls);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      alert("Signout Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setUploading(true);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        formdata
      );

      const imageurl = response.data.secure_url;
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "uploads"), {
        uid: user.uid,
        imageurl,
        uploadAt: new Date(),
      });
      try {
        await axios.post(`http://localhost:3000/api/image-uploaded-event`);
        console.log("Image upload event sent to backend.");
        toast.success("Image uploaded successfully!")
      } catch (error) {
        console.error("Failed to send image upload event to backend:", error);
        // Optionally, inform the user or retry
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }
  async function handleDelete(id) {
    await deleteDoc(doc(db, "uploads", id));
  }
  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <ToastContainer />
      </Header>

      <UploadForm onSubmit={handleUpload}>
        <label htmlFor="file">Upload Image</label>
        <input type="file" onChange={handleFile} />
        <SubmitButton type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </SubmitButton>
      </UploadForm>

      <ImageGrid>
        {images.map((img, index) => (
          <ImageCard key={index}>
            <Image src={img.imageurl} alt={`upload-${index}`} />
            <DeleteButton onClick={() => handleDelete(img.id)}>
              Delete
            </DeleteButton>
          </ImageCard>
        ))}
      </ImageGrid>
    </Container>
  );
}

export default Dashboard;

// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4f;
  border: none;
  padding: 10px 16px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #d9363e;
  }
`;

const UploadForm = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input[type="file"] {
    padding: 5px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #1890ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #096dd9;
  }

  &:disabled {
    background-color: #91d5ff;
    cursor: not-allowed;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 12px;
`;

const Image = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  margin-top: 12px;
  padding: 8px 14px;
  background-color: #ff7875;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f5222d;
  }
`;
