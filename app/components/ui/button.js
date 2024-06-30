import React from "react";
function Button({ text, callback, mood, ...props }) {
  return (
    <button
      onClick={callback}
      className={mood ? "p-1 bg-red-400 rounded" : "p-1 bg-green-400 rounded"}
    >
      {text}
    </button>
  );
}

export default Button;
