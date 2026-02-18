import React, { Component } from "react";

const API = process.env.REACT_APP_API;

class Login extends Component {

  state = { email:"", password:"" }

  handleChange = (e)=>{
    this.setState({ [e.target.name]:e.target.value })
  }

  handleSubmit = async(e)=>{
    e.preventDefault()

    const res = await fetch(`${API}/login/`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(this.state)
    })

    const data = await res.json()

    if(data.jwtToken){
      localStorage.setItem("token",data.jwtToken)
      this.props.onLogin()
    }else{
      alert("Invalid email or password")
    }
  }

  render(){
    return(
      <div className="container">
        <h1>Login</h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <input name="email" placeholder="Email" onChange={this.handleChange} required/>
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange} required/>
          <button>Login</button>
        </form>

          <p className="auth-link" onClick={this.props.goRegister}>
          New user? Register
         </p>

      </div>
    )
  }
}

export default Login;
