// Toogle Checkbox Component
import { Field, ErrorMessage } from "formik";

const ToggleCheckbox = ({ label, name, className = "", description }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="relative inline-flex items-center cursor-pointer">
                <div className="relative flex items-center mt-0.5">
                    <Field
                        type="checkbox"
                        name={name}
                        id={name}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {label}
                    </span>
                    {description && (
                        <span className="text-xs text-slate-500">{description}</span>
                    )}
                </div>
            </label>
            <ErrorMessage
                name={name}
                component="span"
                className="text-xs text-red-500 mt-1 pl-8"
            />
        </div>
    );
};

export default ToggleCheckbox;