import React from "react";

export default function Input({ id, label, ...props }) {
  return (
    <div className="form-group">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className="input" {...props} />
    </div>
  );
}
