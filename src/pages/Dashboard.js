import React, { Component } from "react";
import "../App.css";

const API = process.env.REACT_APP_API;

class Dashboard extends Component {

  state = {
    bills: [],
    editId: null,
    form: {
      title: "",
      amount: "",
      due_day: "",
      reminder_time: "",
      phone: ""
    }
  };

  componentDidMount() {
    this.fetchBills();
  }

  authFetch = (url,options={})=>{
    const token = localStorage.getItem("token");

    return fetch(`${API}${url}`,{
      ...options,
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
  }

  fetchBills = async () => {
    const res = await this.authFetch(`/bills`);
    const data = await res.json();
    this.setState({ bills: data });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.editId) {
      await this.authFetch(`/bills/${this.state.editId}`, {
        method: "PUT",
        body: JSON.stringify(this.state.form)
      });
    } else {
      await this.authFetch(`/bills`, {
        method: "POST",
        body: JSON.stringify(this.state.form)
      });
    }

    this.setState({
      editId: null,
      form: {
        title: "",
        amount: "",
        due_day: "",
        reminder_time: "",
        phone: ""
      }
    });

    this.fetchBills();
  };

  startEdit = (bill) => {
    this.setState({
      editId: bill.id,
      form: {
        title: bill.title,
        amount: bill.amount,
        due_day: bill.due_day,
        reminder_time: bill.reminder_time,
        phone: bill.phone
      }
    });
  };

  deleteBill = async (id) => {
    await this.authFetch(`/bills/${id}`, {
      method: "DELETE"
    });
    this.fetchBills();
  };

  getNextDue = (day) => {
    const now = new Date();
    let due = new Date(now.getFullYear(), now.getMonth(), day);

    if (due < now) {
      due = new Date(now.getFullYear(), now.getMonth() + 1, day);
    }

    return due.toLocaleDateString();
  };

  logout = ()=>{
    localStorage.removeItem("token")
    this.props.onLogout()
  }

  render() {
    const { bills, form, editId } = this.state;

    return (
      <div className="container">
        <h1>EMI Reminder Dashboard</h1>

        <button className="logout-btn" onClick={this.logout}>Logout</button>

        <form onSubmit={this.handleSubmit} className="form">
          <input name="title" placeholder="Bill Title" value={form.title} onChange={this.handleChange} required/>
          <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={this.handleChange} required/>
          <input name="due_day" type="number" min="1" max="31" placeholder="Day (1-31)" value={form.due_day} onChange={this.handleChange} required/>
          <input name="reminder_time" type="time" value={form.reminder_time} onChange={this.handleChange} required/>
          <input name="phone" placeholder="Phone (+91...)" value={form.phone} onChange={this.handleChange} required/>

          <button type="submit">
            {editId ? "Update Bill" : "Add Bill"}
          </button>
        </form>

        <div className="card-container">
          {bills.map((bill) => (
            <div key={bill.id} className="card">
              <h3>{bill.title}</h3>
              <p>RS {bill.amount}</p>
              <p>Next Due: {this.getNextDue(bill.due_day)}</p>
              <p>Reminder Time: {bill.reminder_time}</p>

              <div className="btn-group">
                <button className="paid-btn" onClick={() => this.startEdit(bill)}>
                  Edit
                </button>

                <button className="delete-btn" onClick={() => this.deleteBill(bill.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
