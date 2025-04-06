import React, { useEffect, useState } from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import SubmitButton from "./SubmitButton";
import StatusMessage from "./StatusMessage";
import { calculatePasswordStrength, validateEmail, validateName, validatePassword } from "../utils/FormValidator";
import FormField from "./FormField";
import PasswordField from "./PasswordField";


const RegistrationForm = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Form errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Touch state (track which fields have been interacted with)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // Validity state
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Validate field on change only if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched on blur and validate
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, value);
  };

 
   // Field validation
   const validateField = (fieldName, value) => {
    let newError = ""
    
    switch (fieldName) {
      case "name":
        newError = validateName(value)
        break
        
      case "email":
        newError = validateEmail(value)
        break
        
      case "password":
        newError = validatePassword(value)
        break
        
      default:
        break
    }
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: newError
    }))
    
    setIsValid(prevValid => ({
      ...prevValid,
      [fieldName]: newError === ""
    }))
    
    return newError === ""
  }

   // Calculate password strength
   useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formValues.password))
  }, [formValues.password])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      setSubmitStatus({
        type: "success",
        message: "Registration successful! Welcome aboard.",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Registration failed. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="w-full backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <FormHeader />

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Field */}
            <FormField
              name="name"
              label="Full Name"
              value={formValues.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              isValid={isValid.name}
            />

            {/* Email Field */}
            <FormField
              name="email"
              label="Email Address"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              isValid={isValid.email}
            />

             {/* Password Field */}
             <PasswordField
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              isValid={isValid.password}
              passwordStrength={passwordStrength}
            />

            {/* Status Messages */}
            <StatusMessage status={submitStatus} />
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
