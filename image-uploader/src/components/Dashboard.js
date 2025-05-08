import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: red;
  border: 2px solid red;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  float: right;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
`;

const UploadButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007BFF")};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  justify-content: center;
`;

const ImageCard = styled.div`
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  text-align: center;
  width: 220px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

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

      alert("Image uploaded");
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }
  async function deleteImgage(id) {
    console.log(id);
    await deleteDoc(doc(db, "uploads", id));
  }
  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Header>Dashboard</Header>

      <Form onSubmit={handleUpload}>
        <label htmlFor="file">Choose a file</label>
        <input type="file" id="file" onChange={handleFile} />
        <UploadButton type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </UploadButton>
      </Form>

      <Gallery>
        {images.map((img, idx) => (
          <ImageCard key={idx}>
            <Img src={img.imageurl} alt="Uploaded" />
            <DeleteButton onClick={() => deleteImgage(img.id)}>
              Delete
            </DeleteButton>
          </ImageCard>
        ))}
      </Gallery>
    </Container>
  );
}

export default Dashboard;
