import { Field, ErrorMessage } from "formik";
import { Calendar } from "lucide-react";

const DatePicker = ({ label, name, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-slate-400" />
        </div>
        <Field
          type="date"
          name={name}
          id={name}
          className="block w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
        />
      </div>
      <ErrorMessage
        name={name}
        component="span"
        className="text-xs text-red-500 mt-1"
      />
    </div>
  );
};

export default DatePicker;
