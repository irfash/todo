import React from "react";
import "./RadioBtn.css";
const RadioBtn= ({ status }) => {
  return (
    <svg
      className={`radio icon ${status ? "active" : ""}`}
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      {status ? (
        <>
          <path
            d="M25.4375 15.3125C24.5625 19.6875 21.2637 23.807 16.635 24.7275C14.3775 25.1771 12.0357 24.903 9.943 23.9442C7.85034 22.9854 6.11351 21.3908 4.97981 19.3875C3.84612 17.3842 3.37335 15.0743 3.62884 12.7867C3.88432 10.499 4.85503 8.35033 6.40275 6.64649C9.57725 3.14999 14.9375 2.18749 19.3125 3.93749"
            stroke="#43FF24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5625 13.5625L14.9375 17.9375L25.4375 6.5625"
            stroke="#43FF24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <circle
          cx="14.5"
          cy="14"
          r="10"
          stroke="#0094FF"
          strokeWidth="2"
          fill="none"
        />
      )}
    </svg>
  );
};

export default RadioBtn;
