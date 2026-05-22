import React from 'react';

export function Input(props: any) {
  const { value, onChange, placeholder, type, className } = props;
  return (
    <input
      type={type || 'text'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={
        'border border-gray-300 rounded px-3 py-2 w-full focus:outline-none ' +
        (className || '')
      }
      style={{ marginBottom: 8 }}
    />
  );
}
