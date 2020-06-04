export function isValidEmail(text) {
  const REGEX = /\S+@\S+\.\S+/
  return REGEX.test(String(text).toLowerCase())
}

export function isNotEmpty(value) {
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value != null && value !== ''
}
