import React from 'react';

export const Label = ({ title, children }) => (
  <label>
    <span className="block text-xs font-semibold text-gray-600 uppercase">
      {title}
    </span>
    {children}
  </label>
);
