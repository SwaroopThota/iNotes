import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    return navigate("iNotes/login");
  };
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light px-3'
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/iNotes'>
          iNotes
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarSupportedContent'
        >
          {localStorage.getItem("token") ? (
            <button className='btn btn-outline-danger' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className='btn btn-outline-primary mx-1' to='/iNotes/login'>
                Login
              </Link>
              <Link
                className='btn btn-outline-primary mx-1'
                to='/iNotes/signup'
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
