import React from 'react';

export const Button = ({ children, ...props }) => (
  <button
    className="w-full py-3 mt-2 bg-gray-800 rounded-sm
               font-medium text-white uppercase
               focus:outline-none hover:bg-gray-700 hover:shadow-none"
    {...props}
  >
    {children}
  </button>
);
