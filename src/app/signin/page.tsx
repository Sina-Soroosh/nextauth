import React from "react";

function page() {
  return (
    <>
      <div className="box">
        <h1>Login Form</h1>
        <form role="form" method="post">
          <div className="inputBox">
            <input type="text" autoComplete="off" required />
            <label>Username OR Email</label>
          </div>
          <div className="inputBox">
            <input type="password" autoComplete="off" required />
            <label>Password</label>
          </div>

          <input type="submit" className="register-btn" value="Sign In" />
        </form>
      </div>
    </>
  );
}

export default page;
