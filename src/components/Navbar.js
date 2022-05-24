import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuth, logout, user, setIsAuth } = UserAuth();

  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark dark-mode'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            <b>
              Chapter <span className='text-warning'>9</span>
            </b>
          </Link>
          <button
            className='navbar-toggler d-lg-none'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavId'
            aria-controls='collapsibleNavId'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='collapsibleNavId'>
            <ul className='navbar-nav'>
              {!isAuth ? (
                <>
                  <li className='nav-item active ml-5'>
                    <Link to='/home' className='nav-link'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to='/games' className='nav-link'>
                      Our Games
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item active ml-5'>
                    <Link to='/home' className='nav-link'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to='/games' className='nav-link'>
                      Our Games
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className='navbar-nav ms-auto'>
              {!isAuth ? (
                <>
                  <li className='nav-item active'>
                    <Link to='/signin' className='nav-link'>
                      Sign In
                    </Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to='/signup' className='nav-link'>
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item active'>
                    <Link to={`/account/${user.uid}`} className='nav-link'>
                      {user && user.email}
                    </Link>
                  </li>
                  <li className='nav-item active dropdown show'>
                    <a
                      className='nav-link'
                      data-toggle='dropdown'
                      href='#'
                      aria-expanded='true'>
                      <i className='fas fa-cog' />
                      <span className=''>&nbsp;manage account</span>
                    </a>
                    <div
                      className='dropdown-menu dropdown-menu-lg dropdown-menu-right show'
                      style={{ left: "inherit", right: "0px" }}>
                      <a href='/updateprofile' className='dropdown-item'>
                        <i className='fas fa-user mr-2' /> Update Profile
                      </a>
                      <div className='dropdown-divider' />
                      <a href='#' className='dropdown-item'>
                        <i className='fas fa-key mr-2' /> Reset Password
                      </a>
                      <div className='dropdown-divider' />
                      <Link
                        to='/signup'
                        className='nav-link'
                        onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  </li>
                  {/* <li className="nav-item active">
                                        <Link to='/signup' className="nav-link" onClick={handleLogout}>Logout</Link>
                                    </li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
