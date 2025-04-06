import React, { useState } from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import SubmitButton from "./SubmitButton";

const RegistrationForm = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="w-full backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <FormHeader />

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submit Button */}
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
        {/* Footer */}
        <FormFooter />
      </div>
    </div>
  );
};

export default RegistrationForm;
