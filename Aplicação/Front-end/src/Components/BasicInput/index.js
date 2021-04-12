import React from 'react';

function BasicInputComponent({ type, placeholder, className, name, pattern, required, icon, iconPosition }) {

  const classBase = "w-full py-2 border-2 border-gray-200 rounded-lg placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-purple-600 transition-colors";
  return (
    <>
      {!icon ? (<input type={type} placeholder={placeholder} name={name} patter={pattern} required={required} className={`${className} ${classBase} pl-2`} />) : (
        <div className="relative mt-1">
        <input type={type} placeholder={placeholder} name={name} patter={pattern} required={required} className={`${className} ${iconPosition === "left" ? "pl-10 pr-2" : "pl-2 pr-10"} ${classBase}`} />
          <div className={`block w-7 h-7 text-center text-xl leading-0 absolute top-0.5 ${iconPosition === "left" ? "left-2" : "right-2"}  text-gray-400 focus:outline-none hover:text-gray-900 transition-colors`}>
            {icon}
          </div>
        </div>
      )}
    </>
  );
}

export default BasicInputComponent;