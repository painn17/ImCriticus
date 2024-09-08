import CustomButton from "./button";

function CustomInput({
  icon,
  icon2,
  label,
  placeholder,
  value,
  handleValueChange,
  inputname,
  type = "text",
  area = false,
  focus = false,
  callback,
}) {
  return (
    <div className={`bg-gray-900  rounded-xl h-fit`}>
      {label && <div className="text-gray-600 caption">{label}</div>}
      <div className="flex items-center border border-gray-600 rounded-lg py-2 px-4 justify-around">
        <div className="">{icon}</div>
        {area ? (
          <textarea
            required
            rows={15}
            cols={35}
            type={type}
            name={inputname}
            placeholder={placeholder}
            className="bg-transparent text-gray-300 focus:outline-none py-2 flex-grow  px-4"
            value={value}
            onChange={handleValueChange}
            autoFocus={focus}
          />
        ) : (
          <input
            required
            type={type}
            name={inputname}
            placeholder={placeholder}
            className="bg-transparent text-gray-300 focus:outline-none py-2 flex-grow  px-4"
            value={value}
            onChange={handleValueChange}
            autoFocus={focus}
          />
        )}
        {inputname == "password" ? (
          <div className="w-fit">
            <CustomButton callback={callback} buttonstyle={false}>
              <div>{icon2}</div>
            </CustomButton>
          </div>
        ) : (
          <div className="">{icon2}</div>
        )}
      </div>
    </div>
  );
}

export default CustomInput;
