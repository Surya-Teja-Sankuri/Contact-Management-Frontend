import React, { useRef, useState } from "react";
import '../css/register.css'
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;

const Register = () => {
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
    }
    try {
      const response = await axios.post('/register',
        JSON.stringify({ username, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('no server response');
      } else {
        console.log(JSON.stringify(err))
      }
    }
  };

  return (
    <>
      {
        success ?
          <div className="register-success">
            <h2>Registration succesfull</h2>
            <a href="/login">Login</a>
          </div>
          :
          <div className="container">
            <form className="registration-form" onSubmit={handleSubmit}>
              <h2 className="registration-form__title">Register</h2>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  className="form-input"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
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
                Register
              </button>
              <p className="login-link">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
      }
    </>
  );
};

export default Register;
