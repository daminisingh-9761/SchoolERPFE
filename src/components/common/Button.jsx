function Button({
  text,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {

  const variants = {
    primary:
      "bg-blue-400 hover:bg-blue-600 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    warning:
      "bg-yellow-400 hover:bg-yellow-500 text-black",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    secondary:
      "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-1 rounded-xl transition font-medium ${variants[variant]} ${className}`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
