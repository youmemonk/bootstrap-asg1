import React from "react";

export default class SignUp extends React.Component {
  render() {
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" placeholder="Last Name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    );
  }
}
