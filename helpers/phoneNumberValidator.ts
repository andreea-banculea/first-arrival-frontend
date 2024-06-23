export function phoneNumberValidator(phoneNumber: string) {
    const re = /^(\+4|)?(07\d{8}|02\d{8}|03\d{8})$/;
    if (!phoneNumber) return "Phone number can't be empty.";
    if (!re.test(phoneNumber)) return 'Ooops! We need a valid phone number.';
    return '';
  }
  