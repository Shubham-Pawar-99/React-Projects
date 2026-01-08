function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  onClick,
  className,
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg active:scale-90 cursor-pointer ${bgColor} ${textColor} ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
