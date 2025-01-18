import React from "react";

export const PasswordMatchStatus = ({ passwordMatch }) => {
  return (
    <div className="col-md-12">
      {passwordMatch === false && (
        <div className="text-danger mt-1" style={{ fontSize: "0.8rem" }}>
          Passwords do not match!
        </div>
      )}
      {passwordMatch === true && (
        <div className="text-success mt-1" style={{ fontSize: "0.8rem" }}>
          Passwords match!
        </div>
      )}
    </div>
  );
};