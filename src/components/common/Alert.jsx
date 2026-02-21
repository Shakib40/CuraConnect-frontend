export default function Alert({ type = "success", title, message }) {
  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-lg p-4 ${
        isSuccess
          ? "bg-teal-50 border-t-2 border-teal-500 dark:bg-teal-800/30"
          : "bg-red-50 border-s-4 border-red-500 dark:bg-red-800/30"
      }`}
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <span
            className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${
              isSuccess
                ? "border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400"
                : "border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-200"
            }`}
          >
            {isSuccess ? (
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : (
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            )}
          </span>
        </div>

        <div className="ms-3">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
