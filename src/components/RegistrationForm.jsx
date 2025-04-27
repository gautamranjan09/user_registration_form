import React, { useEffect, useState, useCallback, useRef } from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import SubmitButton from "./SubmitButton";
import StatusMessage from "./StatusMessage";
import { calculatePasswordStrength, validateEmail, validateName, validatePassword } from "../utils/FormValidator";
import { debounce } from "../utils/debounce";
import FormField from "./FormField";
import PasswordField from "./PasswordField";

const RegistrationForm = () => {
  // Create refs for debounce functions to maintain consistency across renders
  const debounceFunctionsRef = useRef({});
  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [formReady, setFormReady] = useState(false);

  // Field validation
  const validateField = (fieldName, value) => {
    let newError = "";

    switch (fieldName) {
      case "name":
        newError = validateName(value);
        break;

      case "email":
        newError = validateEmail(value);
        break;

      case "password":
        newError = validatePassword(value);
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: newError,
    }));

    setIsValid((prevValid) => ({
      ...prevValid,
      [fieldName]: newError === "",
    }));

    return newError === "";
  };

  // Initialize debounce functions once using useRef
  useEffect(() => {
    // Create a debounced validate function for each field
    debounceFunctionsRef.current = {
      name: debounce((value) => validateField("name", value), 300),
      email: debounce((value) => validateField("email", value), 300),
      password: debounce((value) => validateField("password", value), 300),
    };
    
    // Create a debounced password strength calculator
    debounceFunctionsRef.current.passwordStrength = debounce((password) => {
      setPasswordStrength(calculatePasswordStrength(password));
    }, 300);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Run debounced validation if the field has been touched
    if (touched[name] && debounceFunctionsRef.current[name]) {
      debounceFunctionsRef.current[name](value);
    }
    
    // Always update password strength when password changes
    if (name === "password" && debounceFunctionsRef.current.passwordStrength) {
      debounceFunctionsRef.current.passwordStrength(value);
    }
  };

  // Mark field as touched on blur and validate immediately (no debounce)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    // Validate immediately on blur for better UX
    validateField(name, value);
  };

  // Validate all fields
  const validateForm = () => {
    const nameValid = validateField("name", formValues.name);
    const emailValid = validateField("email", formValues.email);
    const passwordValid = validateField("password", formValues.password);

    return nameValid && emailValid && passwordValid;
  };

  // Animate form entry
  useEffect(() => {
    setTimeout(() => {
      setFormReady(true);
    }, 100);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
    });

    // Validate all fields
    if (!validateForm()) {
      return;
    }

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

      // Reset form
      setFormValues({
        name: "",
        email: "",
        password: "",
      });
      setTouched({
        name: false,
        email: false,
        password: false,
      });
      setErrors({
        name: "",
        email: "",
        password: "",
      });
      setIsValid({
        name: false,
        email: false,
        password: false,
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
    <div className={`w-full ${formReady ? 'opacity-100' : 'opacity-0'} transform transition-all duration-700 ease-out`}>
      {/* Improved glassmorphism card */}
      <div className="w-full glass-card rounded-2xl overflow-hidden relative">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-300/30 rounded-full blur-3xl animate-pulse" 
               style={{animationDuration: '8s'}}></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl animate-pulse"
               style={{animationDuration: '12s'}}></div>
          {/* Additional animated elements */}
          <div className="absolute top-40 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" 
               style={{animation: 'float 15s ease-in-out infinite'}}></div>
          <div className="absolute bottom-24 right-16 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"
               style={{animation: 'float 18s ease-in-out infinite alternate'}}></div>
        </div>
        
        {/* Header */}
        <FormHeader />

        {/* Form */}
        <div className="p-8 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6 staggered-animation">
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
            <div className="mt-2">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <FormFooter />
      </div>
    </div>
  );
};

export default RegistrationForm;
