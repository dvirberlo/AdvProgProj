import React from "react";

export const PasswordField = ({
  value,
  onChange,
  errorMessage,
  placeholder,
  name,
}) => {
  return (
    <div className="col-md-12">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type="password"
        className="form-control bg-secondary text-dark"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {errorMessage && (
        <div className="text-danger mt-1" style={{ fontSize: "0.8rem" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
