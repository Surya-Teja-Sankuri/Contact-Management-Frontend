import React, { useState } from "react";
import axios from "../api/axios";
import '../css/login.css';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);
    try {
      const response = await axios.post('/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response.data))
      const accessToken = response.data.accessToken;
      const user = response.data.username;
      setAuth({ user, accessToken });
      console.log(accessToken);
      console.log(user);
      console.log(JSON.stringify(auth));

      setEmail('');
      setPassword('');
      navigate('/')
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No server response');
      } else {
        setErrMsg(error.response.data.message);
        console.log(JSON.stringify(error.response))
      }
    }
  };

  return (

    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Login</h2>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="btn-submit" type="submit">
          Login
        </button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
