import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'
import styled from 'styled-components'

// STYLED COMPONENTS FOR UPLOAD IMAGE

const InputImage = styled.div`
display: flex;
`

const UploadButton = styled.button`
border: none;
border-radius: 2px;
`
//_____________DONE

const Account = () => {
  const { logout, user, setIsAuth, isAuth } = UserAuth()

  let navigate = useNavigate()

  const { id } = useParams()


  const [inputUsername, setInputUsername] = useState('')
  const [inputAddress, setInputAddress] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputPhotoUrl, setInputPhotoUrl] = useState('')

  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [point, setPoint] = useState(0)
  const [photoUrl, setPhotoUrl] = useState('')

  const [playerList, setPlayerList] = useState([])

  // FIRESTORE STORAGE

  const [image, setImage] = useState(null)
  const [file, setFile] = useState("")
  const [progress, setProgress] = useState(0)

  const handleImageFile = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  console.log("image: ", image)

  const handleImageSubmit = () => {
    const storageRef = ref(storage, user.uid + image.name);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL.toString());
          alert('Image uploaded!')
          console.log(photoUrl)
        });
      }
    );
  }
  //______DONE

  const profileCollectionRef = collection(db, 'profiles')

  const createProfile = async () => {
    await addDoc(profileCollectionRef, { username: inputUsername, address: inputAddress, phone: inputPhone, photoUrl: photoUrl, userid: user.uid })
    navigate('/')
  }

  const getPlayers = async () => {
    try {
      const q = query(collection(db, "profiles"), where("userid", "!=", user.uid))
      const data = await getDocs(q)
      setPlayerList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlayers()
  }, [id])


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "profiles"), where("userid", "==", id));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      // console.log(data);
      setUsername(data.username)
      setAddress(data.address)
      setPhone(data.phone)
      setPhotoUrl(data.photoUrl)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGameStats = async () => {
    try {
      const q = query(collection(db, "gamestats"), where("userid", "==", id));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setPoint(data.point)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchGameStats();
  }, [id]);

  return (
    <>
      <section className='dark-mode' style={{ height: '90vh' }}>
        <div className="container">
          <div className="row">
            <div className="mt-3">
              {!username ? (
                <>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h3>form create profile</h3>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="">username</label>
                          <input type="text" onChange={(e) => { setInputUsername(e.target.value) }} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">address</label>
                          <input type="text" onChange={(e) => { setInputAddress(e.target.value) }} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">phone</label>
                          <input type="text" onChange={(e) => { setInputPhone(e.target.value) }} className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">avatar</label>
                          <InputImage>
                            <input type="file" onChange={handleImageFile} className="form-control" />
                            <UploadButton onClick={handleImageSubmit}>Upload</UploadButton>
                          </InputImage>

                        </div>
                        {/* <div className="form-group">
                          <label htmlFor="">avatar</label>
                          <input type="text" onChange={(e) => { setInputPhotoUrl(e.target.value) }} className="form-control" />
                        </div> */}
                        <button onClick={createProfile} className='btn btn-primary mt-2'>create profile</button>
                      </div>
                    </div>

                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                          <div className="text-center">
                            <img className="profile-user-img img-fluid img-circle" src={photoUrl} alt="User profile picture" />
                          </div>
                          <h3 className="profile-username text-center text-uppercase mb-3 text-warning">{username}</h3>
                          <ul className="list-group list-group-unbordered mb-3">
                            <li className="list-group-item">
                              <b className='text-light'>Address</b> <a className="float-right text-secondary">{address}</a>
                            </li>
                            <li className="list-group-item">
                              <b className='text-light'>Phone</b> <a className="float-right text-secondary">{phone}</a>
                            </li>
                            <li className="list-group-item mt-3">
                              <b className='text-light'>Score</b> <a className="float-right text-secondary">{point}</a>
                            </li>
                            <li className="list-group-item">
                              <b className='text-light'>Badge</b> <a className="float-right text-secondary">&#9734;&#9734;&#9734;</a>
                            </li>
                          </ul>
                        </div>
                        {/* /.card-body */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* Box Comment */}
                      <div className="card card-widget">
                        <div className="card-header">
                          <div className="card-tools">
                            <button type="button" className="btn btn-tool" title="Mark as read">
                              <i className="far fa-circle" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                              <i className="fas fa-minus" />
                            </button>
                          </div>
                          {/* /.card-tools */}
                        </div>
                        {/* /.card-header */}

                        <div className="card-footer card-comments">
                          <div className="card-comment">
                            {/* User image */}
                            <img className="img-circle img-sm" src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60" alt="User Image" />
                            <div className="comment-text">
                              <span className="username">
                                Siti
                                <span className="text-muted float-right">7 minutes ago</span>
                              </span>{/* /.username */}
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus expedita vitae laudantium eum voluptatem impedit adipisci error, ipsum odio vel!
                            </div>
                            {/* /.comment-text */}
                          </div>
                          {/* /.card-comment */}
                          <div className="card-comment">
                            {/* User image */}
                            <img className="img-circle img-sm" src="https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60" alt="User Image" />
                            <div className="comment-text">
                              <span className="username">
                                Jane
                                <span className="text-muted float-right">15 minutes ago</span>
                              </span>{/* /.username */}
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam saepe dolorum tempore accusantium illum dolorem.
                            </div>
                            {/* /.comment-text */}
                          </div>
                          {/* /.card-comment */}
                        </div>
                        {/* /.card-footer */}
                        <div className="card-footer">
                          <form action="#" method="post">
                            <img className="img-fluid img-circle img-sm" src={photoUrl} alt="Alt Text" />
                            {/* .img-push is used to add margin to elements next to floating images */}
                            <div className="img-push">
                              <input type="text" className="form-control form-control-sm" placeholder="What's in your mind..." />
                            </div>
                          </form>
                        </div>
                        {/* /.card-footer */}
                      </div>
                      {/* /.card */}
                    </div>
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-header"><h6 className='text-warning text-center'>Player List</h6></div>
                        <div class="card-footer p-0">
                          {
                            playerList.map((e) => {
                              return (
                                <li className="list-group-item" key={e.id}><Link to={`/account/${e.userid}`}><div className="text-light">{e.username}</div></Link></li>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Account