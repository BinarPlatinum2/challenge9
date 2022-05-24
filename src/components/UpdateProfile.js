import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from "styled-components";

// STYLED COMPONENTS FOR UPLOAD IMAGE

const InputImage = styled.div`
  display: flex;
`;

const UploadButton = styled.button`
  border: none;
  border-radius: 2px;
`;
//_____________DONE

const UpdateProfile = () => {
  const { user } = UserAuth();

  let navigate = useNavigate();

  const { id } = useParams();

  const [inputUsername, setInputUsername] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");

  const [playerList, setPlayerList] = useState([]);

  // FIRESTORE STORAGE

  const [image, setImage] = useState(null);

  const handleImageFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log("image: ", image);

  const handleImageSubmit = () => {
    const storageRef = ref(storage, user.uid + image.name);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL.toString());
          console.log(photoUrl);
        });
      }
    );
  };
  //______DONE
  // console.log("PLAYER LIST : ", playerList);

  const getPlayers = async () => {
    try {
      const q = query(
        collection(db, "profiles"),
        where("userid", "==", user.uid)
      );
      const data = await getDocs(q);
      setPlayerList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayers();
  }, [id]);

  console.log("GET PLAYER", playerList);
  const updateProfile = async () => {
    const profileCollectionRef1 = doc(db, "profiles", playerList[0].id);
    updateDoc(profileCollectionRef1, {
      username: inputUsername,
      address: inputAddress,
      phone: inputPhone,
      photoUrl: photoUrl,
    });
    navigate("/");
  };

  return (
    <>
      <section className='dark-mode' style={{ height: "90vh" }}>
        <div className='container'>
          <div className='row'>
            <div className='mt-3'>
              <>
                <div className='col-md-6'>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>form create profile</h3>
                    </div>
                    <div className='card-body'>
                      <div className='form-group'>
                        <label htmlFor=''>username</label>
                        <input
                          type='text'
                          onChange={(e) => {
                            setInputUsername(e.target.value);
                          }}
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor=''>address</label>
                        <input
                          type='text'
                          onChange={(e) => {
                            setInputAddress(e.target.value);
                          }}
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor=''>phone</label>
                        <input
                          type='text'
                          onChange={(e) => {
                            setInputPhone(e.target.value);
                          }}
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor=''>avatar</label>
                        <InputImage>
                          <input
                            type='file'
                            onChange={handleImageFile}
                            className='form-control'
                          />
                          <UploadButton onClick={handleImageSubmit}>
                            Upload
                          </UploadButton>
                        </InputImage>
                      </div>
                      <button
                        onClick={updateProfile}
                        className='btn btn-primary mt-2'>
                        update profile
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
