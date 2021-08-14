import { emailRegex, phoneRegex } from '../../../constants';

const validateRequiredFields = (field, newActorField, dataFields) => {
  if (field.required) {
    if (newActorField) {
      dataFields.push({
        ...field,
        error: false,
      });
    } else {
      dataFields.push({
        ...field,
        error: true,
        helperText: `${field.label} is required`,
      });
    }
  } else {
    dataFields.push({ ...field, error: false });
  }
};

const validateEmail = (field, emailInput, dataFields) => {
  if (!field.required && !emailInput) {
    dataFields.push({ ...field, error: false });
  } else if (emailRegex.test(emailInput)) {
    dataFields.push({ ...field, error: false });
  } else {
    dataFields.push({
      ...field,
      error: true,
      helperText: `Email is not in valid format`,
    });
  }
};

const validatePhone = (field, phoneInput, dataFields) => {
  if (!field.required && !phoneInput) {
    dataFields.push({ ...field, error: false });
  } else if (phoneRegex.test(phoneInput)) {
    dataFields.push({ ...field, error: false });
  } else {
    dataFields.push({
      ...field,
      error: true,
      helperText: 'Please enter a valid phone number',
    });
  }
};

export { validateEmail, validateRequiredFields, validatePhone };
