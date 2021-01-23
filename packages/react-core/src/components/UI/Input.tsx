import React from 'react';

export const Input = React.forwardRef((props: any, ref) => (
  <input
    {...props}
    ref={ref}
    className="block w-full py-3 px-1 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
  />
));
