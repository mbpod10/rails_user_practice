import React from "react";

const AddInfo = ({ information, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={information.name}
          name="name"
          onChange={handleChange}
          required
        />
        <br />
        <label>Address</label>
        <input
          value={information.address}
          name="address"
          onChange={handleChange}
          required
        />
        <br />
        <label>Age</label>
        <input
          value={information.age}
          name="age"
          onChange={handleChange}
          required
        />
        <br />
        <label>Marital Status</label>
        <input
          value={information.marital_status}
          name="marital_status"
          onChange={handleChange}
          required
        />
        <br />
        <label>US Citizen</label>
        <input
          value={information.citizen}
          name="citizen"
          onChange={handleChange}
          required
        />
        <br />
        <label>Dependent</label>
        <input
          value={information.dependent}
          name="dependent"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <br /> <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AddInfo;
