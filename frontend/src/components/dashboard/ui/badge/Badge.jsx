// type BadgeVariant = "light" | "solid";
// type BadgeSize = "sm" | "md";
// type BadgeColor =
//   | "primary"
//   | "success"
//   | "error"
//   | "warning"
//   | "info"
//   | "light"
//   | "dark";

// interface BadgeProps {
//   variant?: BadgeVariant; // Light or solid variant
//   size?: BadgeSize; // Badge size
//   color?: BadgeColor; // Badge color
//   startIcon?: React.ReactNode; // Icon at the start
//   endIcon?: React.ReactNode; // Icon at the end
//   children: React.ReactNode; // Badge content
// }
const Badge = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  const sizeStyles = {
    sm: "text-xs", // Adjusted Tailwind class for smaller size
    md: "text-sm",
  };

  const variants = {
    light: {
      primary:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
      success:
        "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-500",
      error: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-500",
      warning:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400",
      info: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-500",
      light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
      dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
    },
    solid: {
      primary: "bg-blue-600 text-white",
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      warning: "bg-yellow-500 text-white",
      info: "bg-cyan-600 text-white",
      light: "bg-gray-400 text-white",
      dark: "bg-gray-700 text-white",
    },
  };

  const sizeClass = sizeStyles[size] || sizeStyles.md;
  const colorStyles = variants[variant][color] || "";

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
