import ReactSelect from "react-select";
import { useField } from "formik";

const Select = ({
  label,
  name,
  options,
  placeholder,
  isMulti = false,
  className = "",
}) => {
  const [field, meta, helpers] = useField(name);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "10px",
      borderColor: state.isFocused ? "#14b8a6" : "#cbd5e1",
      boxShadow: state.isFocused ? "0 0 0 1px #14b8a6" : "none",
      padding: "2px",
      fontSize: "0.875rem",
      backgroundColor: "white",
      "&:hover": {
        borderColor: state.isFocused ? "#14b8a6" : "#cbd5e1",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0f766e"
        : state.isFocused
          ? "#ccfbf1"
          : "white",
      color: state.isSelected ? "white" : "#0f172a",
      fontSize: "0.875rem",
      cursor: "pointer",
      ":active": {
        ...provided[":active"],
        backgroundColor: "#0f766e",
        color: "white",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "8px",
      height: "42px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "8px",
    }),
  };

  const handleChange = (selectedOption) => {
    helpers.setValue(
      isMulti
        ? selectedOption.map((item) => item.value)
        : selectedOption
          ? selectedOption.value
          : "",
    );
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value?.includes(option.value))
        : options.find((option) => option.value === field.value);
    }
    return isMulti ? [] : "";
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <ReactSelect
        id={name}
        name={name}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        value={getValue() || (isMulti ? [] : "")}
        onChange={handleChange}
        onBlur={handleBlur}
        styles={customStyles}
        classNamePrefix="react-select"
      />
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-500 mt-1">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default Select;
