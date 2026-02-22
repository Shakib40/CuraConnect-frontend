import { Toast as FlowbiteToast } from "flowbite-react";
import { Check, X, Bell, Info } from "lucide-react";

const Toast = ({ message, type = "info" }) => {
  return (
    <FlowbiteToast>
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          type === "success"
            ? "bg-green-100 text-green-500"
            : type === "error"
              ? "bg-red-100 text-red-500"
              : type === "warning"
                ? "bg-amber-100 text-amber-500"
                : "bg-blue-100 text-blue-500"
        }`}
      >
        {type === "success" && <Check className="h-5 w-5" />}
        {type === "error" && <X className="h-5 w-5" />}
        {type === "warning" && <Bell className="h-5 w-5" />}
        {type === "info" && <Info className="h-5 w-5" />}
      </div>
      <div className="ml-3 text-sm font-medium text-slate-700">{message}</div>
      <FlowbiteToast.Toggle />
    </FlowbiteToast>
  );
};

export default Toast;
