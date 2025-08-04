import React from 'react';

const Tag = ({ children, variant = 'primary', size = 'sm' }) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-primary-50 text-primary-600 border-primary-100',
      secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100',
      accent: 'bg-accent-50 text-accent-600 border-accent-100',
      gray: 'bg-gray-50 text-gray-600 border-gray-100',
      success: 'bg-green-50 text-green-600 border-green-100',
      warning: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    };
    return variants[variant] || variants.primary;
  };

  const getSizeClasses = () => {
    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    return sizes[size] || sizes.sm;
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${getVariantClasses()}
        ${getSizeClasses()}
        transition-all duration-200 hover:scale-105
      `}
    >
      {children}
    </span>
  );
};

export default Tag;