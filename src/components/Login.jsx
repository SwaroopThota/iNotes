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
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.authToken) {
      localStorage.setItem("token", response.authToken);
      setCredentials({ email: "", password: "" });
      return navigate("/");
    } else {
      alert("Invalid Credentials");
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
      <h2 className="my-3">Login to iNotes</h2>
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
          autoComplete="true"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
