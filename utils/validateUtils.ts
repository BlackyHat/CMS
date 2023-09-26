import { NextResponse } from 'next/server';

interface IReqField {
  value: string;
  fieldName: string;
}

const validateField = (value: string, fieldName: string) => {
  if (Array.isArray(value) && value.length === 0) {
    return new NextResponse(`${fieldName} is required`, { status: 400 });
  }
  if (!value) {
    return new NextResponse(`${fieldName} is required`, { status: 400 });
  }
  return null;
};

export const validateFields = (requiredFields: IReqField[]) => {
  const validationErrors = [];
  for (const field of requiredFields) {
    const error = validateField(field.value, field.fieldName);
    if (error) {
      validationErrors.push(error);
    }
  }
  if (validationErrors.length > 0) {
    return validationErrors[0];
  }
  return;
};
