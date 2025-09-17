import React from "react";

export default function Button({ id, children, ...props }) {
  return (
    <button id={id} className="btn" {...props}>
      {children}
    </button>
  );
}
