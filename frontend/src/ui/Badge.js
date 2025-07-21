

export default function Badge({ children, className = "", variant = "default" }) {
  const baseClasses = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

  const variants = {
    default: "bg-global-3 text-white",
    secondary: "bg-gray-200 text-gray-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
