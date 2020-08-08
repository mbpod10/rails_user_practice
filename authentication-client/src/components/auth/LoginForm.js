import React from "react";

const LoginForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={user.email}
          name="email"
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
