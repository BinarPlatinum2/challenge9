import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { createUser, setIsAuth } = UserAuth()

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await createUser(email, password)
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/account')
        } catch (e) {
            setError(e.message)
            console.log(e.message);
        }
    }
    return (
        <>
        <section className='dark-mode' style={{ height: '90vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="card" style={{ marginTop: '70px' }}>
                            <div className="card-header bg-dark">
                                <h3 className='text-center text-warning text-uppercase'>Sign Up Form</h3>
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
                                    <button type="submit" className='btn btn-primary mt-2 col-12'>Sign Up</button>
                                    <button className="btn btn-block btn-danger mt-2">
                                            <i class="fab fa-google mr-2"></i>
                                            Sign Up using Google
                                        </button>
                                </form>
                            </div>
                        </div>
                        <p className='mt-3'>already have an account , <Link to='/signin'><b>SignIn</b></Link></p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Signup