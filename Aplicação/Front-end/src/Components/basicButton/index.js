import React from 'react';

function ButtonComponent(props) {
  return (
    <button {...props} className={`${props.className} w-48 flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200`}>
        {props.children}
    </button>
  );
}

export default ButtonComponent;