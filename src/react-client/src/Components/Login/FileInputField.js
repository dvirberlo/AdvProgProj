import React from 'react';

export const FileInputField = ({ label, name, onChange, errorMessage }) => (
  <div className="col-md-12">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      type="file"
      className="form-control bg-secondary text-dark"
      id={name}
      name={name}
      onChange={onChange}
      required
    />
    {errorMessage && <div className="text-danger mt-1" style={{ fontSize: "0.8rem" }}>{errorMessage}</div>}
  </div>
);