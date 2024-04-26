export const required = function (value: any, validationText = '* required') {
  if (value instanceof Array && !value.length) { return validationText }
  return !!value || validationText
}

export const blank = function (value: any, validationText = '* Value cannot be blank') {
  return (value && !!value.replace(/^\s+/, '')) || validationText
}

export const email = function (value: string, validationText = '* Invalid e-mail') {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value) || validationText
}

export const alpha = function (value: string, validationText = '* Should have alphabetic characters only') {
  const pattern = /^[A-Za-zء-ي\s]+$/
  return pattern.test(value.trim()) || validationText
}

export const titleMinChars = function (value: string, validationText = '* title must have at least 5 words') {
  return value.trim().split(' ').length >= 5 || validationText
}

export const fullNameMinChars = function (value: string, validationText = '* First and last name is required') {
  return value.trim().split(' ').length >= 2 || validationText
}

export const hasLowercase = function (value: string, validationText = '* password must have at least 1 lowercase character') {
  const hasLowercase = /(?=.*[a-z])/.test(value)
  return hasLowercase || validationText
}

export const hasUppercase = function (value: string, validationText = '* password must have at least 1 uppercase character') {
  const hasUppercase = /(?=.*[A-Z])/.test(value)
  return hasUppercase || validationText
}

export const hasNumber = function (value: string, validationText = '* password must have at least one number') {
  const hasNumber = /(?=.*\d)/.test(value)
  return hasNumber || validationText
}

export const hasSpecial = function (value: string, validationText = "* password must have one special character ('\"!@#$*;&:?)+-") {
  const hasSpecial = /(?=.*['"!@#$*;&:?+-])/.test(value)
  return hasSpecial || validationText
}

export const minchars = function (value: string | any[], validationText = '* password must have at least 6 characters') {
  return value.length > 5 || validationText
}

export const url = function (value: string, validationText = '* Wrong facebook url format') {
  const code = /^(https?:\/\/)?(www\.)?(.+\.com)\/.+/g
  return code.test(value) || validationText
}
