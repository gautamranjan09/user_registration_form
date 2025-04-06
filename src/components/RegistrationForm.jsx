import React, { useState } from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

const RegistrationForm = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="w-full opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="w-full backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header */}
      <FormHeader />

      {/* Footer */}
      <FormFooter />
      </div>
    </div>
  );
};

export default RegistrationForm;
