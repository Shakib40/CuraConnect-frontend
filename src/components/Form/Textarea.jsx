import { Field, ErrorMessage } from "formik";

const Textarea = ({ label, name, placeholder, rows = 4, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <Field
        as="textarea"
        name={name}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors resize-y"
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-xs text-red-500 mt-1"
      />
    </div>
  );
};

export default Textarea;
