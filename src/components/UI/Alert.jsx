import { Alert as FlowbiteAlert } from "flowbite-react";

const Alert = ({
  color = "info",
  icon: Icon,
  onDismiss,
  children,
  className = "",
}) => {
  return (
    <FlowbiteAlert
      color={color}
      icon={Icon}
      onDismiss={onDismiss}
      className={`mb-4 ${className}`}
    >
      {children}
    </FlowbiteAlert>
  );
};

export default Alert;
