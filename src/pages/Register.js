import React, { Component } from "react";

const API = process.env.REACT_APP_API;

class Register extends Component {

  state = {
    name:"",
    email:"",
    phone:"",
    password:""
  }

  handleChange = (e)=>{
    this.setState({ [e.target.name]:e.target.value })
  }

  handleSubmit = async(e)=>{
    e.preventDefault()

    await fetch(`${API}/users/`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(this.state)
    })

    alert("Account created. Please login.")
    this.props.goLogin()
  }

  render(){
    return(
      <div className="container">
        <h1>Register</h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <input name="name" placeholder="Name" onChange={this.handleChange} required/>
          <input name="email" placeholder="Email" onChange={this.handleChange} required/>
          <input name="phone" placeholder="Phone" onChange={this.handleChange} required/>
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange} required/>
          <button>Create Account</button>
        </form>

        <p className="auth-link" onClick={this.props.goLogin}>
        Already have account? Login
      </p>

      </div>
    )
  }
}

export default Register;
