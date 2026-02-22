import { useField } from "formik";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

const FileSelect = ({
  label,
  name,
  accept,
  multiple = false,
  className = "",
}) => {
  const [field, meta, helpers] = useField(name);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const files = event.currentTarget.files;
    helpers.setValue(multiple ? files : files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (fileInputRef.current) fileInputRef.current.files = files;
      helpers.setValue(multiple ? files : files[0]);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <div
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${meta.touched && meta.error ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-teal-400"}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-sm font-medium text-slate-700 text-center">
          <span className="text-teal-600 hover:underline">Click to upload</span>{" "}
          or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-1 text-center">
          {field.value
            ? multiple
              ? `${field.value.length} files selected`
              : field.value.name
            : accept
              ? `Accepted files: ${accept}`
              : "Any file type supported"}
        </p>
      </div>
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-500 mt-1">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default FileSelect;
