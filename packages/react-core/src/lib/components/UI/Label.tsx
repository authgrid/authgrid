import React from 'react';

interface ILabel {
  title: string;
  error?: string | undefined;
  children: React.ReactNode;
}

export const Label = ({ title, error, children }: ILabel) => (
  <label>
    <span className="block text-xs font-semibold text-gray-600 uppercase">
      {title}
    </span>
    {children}
    {error && <span className="block text-sm mt-2 text-red-500">{error}</span>}
  </label>
);
