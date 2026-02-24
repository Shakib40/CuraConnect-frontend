import { Field } from "formik";

const Radio = ({ name, value, checked, onChange, label, className = "", disabled = false }) => {
    return (
        <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
            <Field
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:border-purple-600 peer-checked:bg-purple-600 relative">
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full peer-checked:translate-x-1/2 transition-transform"></div>
            </div>
            {label && (
                <span className="ml-2 text-sm font-medium text-slate-700">
                    {label}
                </span>
            )}
        </label>
    );
};

export default Radio;