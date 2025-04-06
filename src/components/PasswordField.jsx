import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import EnhancedFloatingInput from "./EnhancedFloatingInput";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

function PasswordField({ value, onChange, onBlur, error, touched, isValid, passwordStrength }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <div className="relative">
        <EnhancedFloatingInput
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={touched && error}
          isValid={isValid}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {value && <PasswordStrengthMeter strength={passwordStrength} />}

      {touched && error && <p className="text-sm text-rose-500 animate-[fadeIn_0.2s_ease-out_forwards]">{error}</p>}
    </div>
  );
}

export default PasswordField;
