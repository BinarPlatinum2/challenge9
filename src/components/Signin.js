import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

//GOOGLE OAUTH
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
//________

const Signin = () => {
    const { signIn, isAuth, setIsAuth, user, forgotPassword } = UserAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/home')
        } catch (e) {
            setError(e.message)
            console.log(e.message);
        }
    }

    // GOOGLE OAUTH
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
        localStorage.setItem('isAuth', true)
        setIsAuth(true)
        navigate('/home')
    }

    //____________

    const forgotPasswordHandler = () => {
        if (email) forgotPassword(email).then(alert('Check your email (kindly check spam also)'))
    }

    return (
        <>
            <section className='dark-mode' style={{ height: '90vh' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="card" style={{ marginTop: '70px' }}>
                                <div className="card-header bg-dark">
                                    <h3 className='text-center text-warning text-uppercase'>Sign In Form</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' className="form-control" ></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Password</label>
                                            <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' className="form-control" ></input>
                                        </div>
                                        <button type="submit" className='btn btn-primary mt-2 col-12'>Sign In</button>
                                        <button className="btn btn-block btn-danger mt-2" onClick={signInWithGoogle}>
                                            <i class="fab fa-google mr-2"></i>
                                            Sign In using Google
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p className='mt-3'>Sign Up for free account , <Link to='/signup'><b>Sign Up</b></Link></p>
                            <button className="btn btn-block btn-danger mt-2" onClick={forgotPasswordHandler}>

                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin