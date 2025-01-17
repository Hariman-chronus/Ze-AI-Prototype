import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'card' | 'timeframe';
  selected?: boolean;
}

export function Button({
  variant = 'primary',
  selected = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'transition-all';
  
  const variantStyles = {
    primary: 'px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed',
    secondary: 'px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg',
    card: `p-6 rounded-lg border-2 ${
      selected
        ? 'border-blue-600 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'
    }`,
    timeframe: `p-4 rounded-lg border-2 ${
      selected
        ? 'border-blue-600 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'
    }`,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}