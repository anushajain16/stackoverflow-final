
function Input({ 
  type = "text", 
  className = "", 
  placeholder = "", 
  value, 
  onChange, 
  disabled = false 
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex h-10 w-100 rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white 
                  placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
    />
  );
}

export { Input };
