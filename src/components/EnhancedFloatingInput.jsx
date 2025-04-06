import { useState, useEffect } from "react";

function EnhancedFloatingInput({ name, label, value, onChange, onBlur, error, isValid, type = "text" }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value !== "");
  }, [value]);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
    onBlur(e);
  };

  // Determine label color based on state
  const getLabelColor = () => {
    if (error) return "rgb(239, 68, 68)"; // red-500 for errors
    if (isValid && hasValue) return "rgb(34, 197, 94)"; // green-500 when valid with value
    if (isFocused) return "rgb(79, 70, 229)"; // indigo-600 when focused
    if (hasValue) return "rgb(107, 114, 128)"; // gray-500 when has value
    return "rgb(156, 163, 175)"; // gray-400 default
  };

  // Determine border style based on state
  const getBorderClasses = () => {
    if (error) {
      return "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200";
    }

    if (isValid && hasValue) {
      return "border-green-300 focus:border-green-500 focus:ring focus:ring-green-200";
    }

    if (isFocused) {
      return "border-indigo-300 focus:border-indigo-600 focus:ring focus:ring-indigo-200";
    }

    return "border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200";
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        style={{
          top: isFocused || hasValue ? "-12px" : "50%",
          fontSize: isFocused || hasValue ? "0.75rem" : "0.875rem",
          color: getLabelColor(),
          transition: "all 0.2s ease",
        }}
        className="absolute left-3 transform -translate-y-1/2 pointer-events-none bg-white px-1 z-10"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block w-full px-3 py-3 rounded-lg border ${getBorderClasses()} outline-none transition-all duration-200`}
      />
    </div>
  );
}

export default EnhancedFloatingInput;
