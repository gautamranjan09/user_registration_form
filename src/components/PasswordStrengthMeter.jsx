function PasswordStrengthMeter({ strength }) {
  const labels = ["", "Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const colors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];
  const textColors = ["text-gray-400", "text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-emerald-500"];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex h-1 w-full space-x-1 animate-[fadeIn_0.3s_ease-out_forwards]">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-full rounded-full transition-all duration-300 ${level <= strength ? colors[strength] : "bg-gray-200"}`}
            style={{
              width: "20%",
              opacity: level <= strength ? 1 : 0.3,
            }}
          />
        ))}
      </div>
      <p className={`text-xs font-medium transition-all duration-300 ${textColors[strength]}`}>{labels[strength]}</p>
    </div>
  );
}

export default PasswordStrengthMeter;
