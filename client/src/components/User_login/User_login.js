import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './User_login.css';

const User_login = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('login');
  const [username,setUsername] = useState("")
  const [password,setPasword] = useState("")
  const [email,setEmail] = useState("")

  const [usernamelog,setUsernamelog] = useState("")
  const [passwordlog,setPaswordlog] = useState("")

  const PostData = () =>{
    fetch('/signupuser',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        email,
        password

      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log(data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  
  const switchForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <section className="forms-section">
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => switchForm('login')}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login">
            <fieldset>
              <legend>Please, enter your username and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">Username</label>
                <input id="login-email" type="username" value={usernamelog} onChange={(e)=>setUsernamelog(e.target.value)} required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password"  value={passwordlog} onChange={(e)=>setPaswordlog(e.target.value)} required />
              </div>
            </fieldset>
            <button
  type="submit"
  className="btn-login"

>
  Login
</button>
          </form>
        </div>
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => switchForm('signup')}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup">
            <fieldset>
              <legend>Please, enter your email, password, and username for sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Username</label>
                <input id="signup-password" type="username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">Password</label>
                <input id="signup-password-confirm" type="password" value={password} onChange={(e)=>setPasword(e.target.value)} required />
              </div>
            </fieldset>
            <button type="submit" className="btn-signup"
            onClick={()=>PostData()}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default User_login;
