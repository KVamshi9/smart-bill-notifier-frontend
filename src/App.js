import React, { Component } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

class App extends Component {

  state = {
    page: localStorage.getItem("token") ? "dashboard" : "login"
  };

  goLogin = () => this.setState({ page: "login" });
  goRegister = () => this.setState({ page: "register" });
  goDashboard = () => this.setState({ page: "dashboard" });

  render() {

    if (this.state.page === "login")
      return <Login onLogin={this.goDashboard} goRegister={this.goRegister} />

    if (this.state.page === "register")
      return <Register goLogin={this.goLogin} />

    return <Dashboard onLogout={this.goLogin} />
  }
}

export default App;
