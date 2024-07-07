import React from "react";
function Button({ children, callback, mood, ...props }) {
  return (
    <button
      onClick={callback}
      className={mood ? "p-1 bg-red-400 rounded" : "p-1 bg-green-400 rounded"}
    >
      {children}
    </button>
  );
}

export default Button;
