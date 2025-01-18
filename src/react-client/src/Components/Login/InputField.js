import React from "react";

export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  maxLengthWarning,
  errorMessage,
}) => (
  <div className="col-md-12">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control bg-secondary text-dark"
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
    {maxLengthWarning && (
      <div className="text-warning mt-1" style={{ fontSize: "0.8rem" }}>
        Maximum length of 20 characters reached.
      </div>
    )}
    {errorMessage && (
      <div className="text-danger mt-1" style={{ fontSize: "0.8rem" }}>
        {errorMessage}
      </div>
    )}
  </div>
);
