import React, { Component } from "react";
/* import logo from "./assets/logo.png";
 */

import "../../tailwind.css"
import "./Login.css";

class Login extends Component {


    handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.email.value === "me@example.com" &&
      e.target.password.value === "123456"
    ) {
      alert("Successfully logged in");
      e.target.email.value = "";
      e.target.password.value = "";
    } else {
      alert("Wrong email or password combination");
    }
  };

  handleClick = e => {
    e.preventDefault();

    alert("Goes to registration page");
  };

  render() {
    return (
      <div className="Appii"
/*      style={{
        position: 'relative', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}*/
      >
{/*         <img src={logo} className="logo" alt="Business view - Reports" />
 */}        
 <div className="loginForm">
 <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="nome@email.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="********"/>
          </div>
          <button id="primary" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded"><p style={{fontWeight:'bold', fontSize:'200%'}}>Login</p></button>
        </form>
        <br></br>
        <button id="eraserBtn" onClick={this.handleClick}class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-4 px-10 border border-green-500 hover:border-transparent rounded"><p style={{fontWeight:'bold', fontSize:'200%'}}>Register</p></button>

 </div>

      </div>
    );
  }
}

export default Login;
