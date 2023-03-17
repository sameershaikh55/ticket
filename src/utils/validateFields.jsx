export function validateFields(fields) {
  let errors = [];
  let allFieldsEmpty = true;

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (fieldValue) {
      if (Array.isArray(fieldValue) && fieldValue.length === 0) {
        errors.push(`${fieldName} must have at least one value`);
      }
      allFieldsEmpty = false;
    } else {
      errors.push(`${fieldName} is required`);
    }
  }

  if (allFieldsEmpty) {
    errors.push("All fields are required");
  }

  return errors;
}
