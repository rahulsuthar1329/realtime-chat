import React, { useState } from "react";
import AddImage from "../img/image-icon.png";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [imgName, setImgName] = useState("Upload Image here...");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, username);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            setErr(true);
          }
        });
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const changeImgName = (e) => {
    setImgName(e.target.files[0].name);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Let's Talk</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" autoComplete="off" />
          <input type="email" placeholder="Email" autoComplete="none" />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            name="upload"
            onChange={changeImgName}
          />
          <label htmlFor="file">
            <img src={AddImage} alt="img-icon" />
            {imgName}
          </label>
          <button>Sign Up</button>
        </form>
        <p>
          Already have an Account? <Link to="/login">Login here.</Link>
        </p>
        {err && <span>Somethin went wrong.</span>}
      </div>
    </div>
  );
};
