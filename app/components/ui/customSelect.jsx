import Select from "react-select";
function CustomSelect({
  options,
  value,
  defaultValue,
  handler,
  isMulti = false,
  style,
}) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
      color: "#F9FAFB", // text-gray-50
      borderColor: "#4b5563", // border-gray-600
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F9FAFB", // text-gray-50
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1F2937" : "#111827",
      color: "#F9FAFB", // text-gray-50
    }),
  };

  return (
    <Select
      value={value}
      options={options}
      isMulti={isMulti}
      styles={customStyles}
      className={style}
      defaultValue={defaultValue}
      onChange={(event) => {
        handler(event);
      }}
    ></Select>
  );
}

export default CustomSelect;
