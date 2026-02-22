const Skeleton = ({ type = "text", lines = 1, className = "" }) => {
  if (type === "card") {
    return (
      <div
        className={`animate-pulse border border-slate-200 rounded-lg p-4 w-full bg-white ${className}`}
      >
        <div className="h-3 bg-slate-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full w-4/5"></div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-2 bg-slate-200 rounded-full mb-3 ${i === lines - 1 ? "w-5/6" : "w-full"}`}
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
