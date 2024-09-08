import React from "react";
function CustomButton({
  children,
  callback,
  buttonstyle = true,
  isClickable,
  height = "h-fit",
  width,
  ...props
}) {
  return (
    <div
      className={
        (buttonstyle
          ? `primary-bg px-8  rounded-xl text-gray-50 `
          : isClickable
          ? "success-text  link-regular "
          : "primary-text  link-regular ") +
        " gap-2 flex  transition duration-200 hover:scale-105" +
        (height ? `  h-${height} ` : "") +
        (width ? ` w-${width}` : " w-full ")
      }
    >
      <button className="link-regular flex-grow" onClick={callback}>
        <div className=" gap-2">{children}</div>
      </button>
    </div>
  );
}

export default CustomButton;
