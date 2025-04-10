export const validateName = (value) => {
  if (!value.trim()) return "Name is required";
  if (value.length < 5) return "Name must be at least 5 characters";
  if (value.length > 50) return "Name cannot exceed 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces";
  return "";
};

export const validateEmail = (value) => {
  if (!value.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(value)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(value)) return "Include at least one number";
  if (!/[^a-zA-Z0-9]/.test(value)) return "Include at least one special character";
  return "";
};

export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  return strength;
};
