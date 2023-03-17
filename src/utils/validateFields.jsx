export function validateFields(fields) {
  let errors = [];

  let allFieldsEmpty = true;

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (fieldValue) {
      allFieldsEmpty = false;
    } else {
      errors.push(`${fieldName} is required`);
    }
  }

  if (allFieldsEmpty) {
    errors = [];
    errors.push("All fields are required");
  }

  return errors;
}
