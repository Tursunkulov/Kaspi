export const kaspiLoginPhone = (value) => {
  const text = String(value ?? '').trim();
  if (!/^\+?[\d\s()-]+$/.test(text)) return null;
  const digits = text.replace(/\D/g, '');
  if (/^[78]\d{10}$/.test(digits)) return digits.slice(1);
  return /^\d{10}$/.test(digits) ? digits : null;
};
