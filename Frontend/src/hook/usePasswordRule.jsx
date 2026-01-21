export default function usePasswordRules(password, confirmPassword) {
  return {
    length: password.length >= 8,

    upperLower:
      /[A-Z]/.test(password) && /[a-z]/.test(password),

    number:
      /[0-9]/.test(password),

    special:
      /[@;!$.\-_*?&]/.test(password),

    match:
      password.length > 0 &&
      password === confirmPassword,
  };
}
