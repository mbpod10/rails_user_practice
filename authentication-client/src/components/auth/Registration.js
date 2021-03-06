import React from "react";

const Registration = ({ user, handleChange, handleSubmit }) => {
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
        <label>Confirm Password</label>
        <input
          type="password"
          value={user.password_confirmation}
          name="password_confirmation"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
