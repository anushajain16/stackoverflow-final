const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  rightIcon,
  className = "",
}) => {
  const baseClasses = 'rounded font-medium focus:outline-none focus:ring-2 inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-global-1 text-white hover:bg-blue-700',
    secondary: 'bg-button-1 text-black hover:bg-gray-300',
    outline: 'border border-gray-400 text-black hover:bg-gray-100',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-xs ',
    medium: 'px-4 py-2 text-sm ',
    large: 'px-5 py-2.5 text-base ',
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <span>{children}</span>
      {rightIcon && (
        <img 
          src={rightIcon} 
          alt="" 
          className="w-4 h-4 sm:w-5 sm:h-5 ml-1"
        />
      )}
    </button>
  );
};

export default Button;