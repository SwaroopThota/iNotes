import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      alert("Passwords doesn't match");
      return;
    }
    let response = await fetch(
      "https://inotes-backend69.herokuapp.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );
    response = await response.json();
    if (response.authToken) {
      localStorage.setItem("token", response.authToken);
      return navigate("/iNotes");
    } else {
      alert(response.errors[0].msg);
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
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          name='name'
          id='name'
          placeholder='name'
          value={credentials.name}
          minLength={3}
          onChange={onChange}
          required
        />
        <label className='form-label' htmlFor='name'>
          Name
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='email'
          className='form-control'
          name='email'
          placeholder='email'
          id='email'
          value={credentials.email}
          onChange={onChange}
          required
        />
        <label className='form-label' htmlFor='email'>
          Email address
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='password'
          className='form-control'
          name='password'
          placeholder='password'
          id='password'
          value={credentials.password}
          onChange={onChange}
          required
          autoComplete='true'
          minLength={8}
        />
        <label className='form-label' htmlFor='password'>
          Password
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='password'
          className='form-control'
          name='cpassword'
          placeholder='cpassword'
          id='cpassword'
          value={credentials.cpassword}
          onChange={onChange}
          required
          minLength={8}
          autoComplete='true'
        />
        <label className='form-label' htmlFor='cpassword'>
          Confirm Password
        </label>
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default SignUp;
