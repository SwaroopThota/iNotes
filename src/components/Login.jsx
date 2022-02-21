import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    let response = await fetch(
      "https://inotes-backend69.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    response = await response.json();
    if (response.authToken) {
      localStorage.setItem("token", response.authToken);
      setCredentials({ email: "", password: "" });
      return navigate("/iNotes");
    } else {
      alert("Invalid Credentials");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return navigate("/iNotes");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <form onSubmit={loginUser}>
      <h2 className='my-3'>Login to iNotes</h2>
      <div className='mb-3 form-floating'>
        <input
          type='email'
          className='form-control'
          name='email'
          id='email'
          placeholder='email'
          value={credentials.email}
          onChange={onChange}
          required
        />
        <label className='form-label' htmlFor='email'>
          Email address
        </label>
      </div>
      <div className='mb-3 form-floating'>
        <input
          type='password'
          className='form-control'
          name='password'
          id='password'
          placeholder='password'
          value={credentials.password}
          onChange={onChange}
          required
          minLength={8}
          autoComplete='true'
        />
        <label className='form-label' htmlFor='email'>
          Password
        </label>
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default Login;
