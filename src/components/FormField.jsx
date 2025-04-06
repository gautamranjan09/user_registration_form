import React from "react";
import EnhancedFloatingInput from "./EnhancedFloatingInput";

function FormField({ name, label, type = "text", value, onChange, onBlur, error, touched, isValid }) {
  return (
    <div className="space-y-1">
       <EnhancedFloatingInput
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && error}
        isValid={isValid}
      />
      {touched && error && <p className="text-sm text-rose-500 animate-[fadeIn_0.2s_ease-out_forwards]">{error}</p>}
    </div>
  );
}

export default FormField;
