export const validateEmail = (value: string) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value) || "Invalid email format";
};

export const validatePassword = (value: string) => {
  const minLength = 8;
  return (
    value.length >= minLength ||
    `Password must be at least ${minLength} characters`
  );
};
