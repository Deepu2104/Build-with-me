// eslint-disable-next-line no-unused-vars
import React from "react";
import "./index.scss";

// eslint-disable-next-line react/prop-types
export default function Button({ title, onClick }) {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
}