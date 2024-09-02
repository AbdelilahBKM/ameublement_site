import React from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // import default styles

interface PhoneNumberInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  errorMessage?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange, errorMessage }) => {
  const handleChange = (value: string | undefined) => {
    onChange(value);
  };

  return (
    <div>
      <PhoneInput
        international
        defaultCountry="MA"
        value={value}
        onChange={handleChange}
        placeholder="Enter phone number"
        className="border h-[40px] rounded-md pl-4"
      />
      {!isValidPhoneNumber(value || '') && value && (
        <div style={{ color: 'red' }}>{errorMessage || 'Numéro de téléphone invalide'}</div>
      )}
    </div>
  );
};

export default PhoneNumberInput;
