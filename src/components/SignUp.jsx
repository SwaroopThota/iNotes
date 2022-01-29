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
    let response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    response = await response.json();
    if (response.authToken) {
      localStorage.setItem("token", response.authToken);
      return navigate("/");
    } else {
      alert(response.errors[0].msg);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <form onSubmit={loginUser}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={credentials.name}
          minLength={3}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={credentials.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={credentials.password}
          onChange={onChange}
          required
          minLength={8}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
          required
          minLength={8}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignUp;
