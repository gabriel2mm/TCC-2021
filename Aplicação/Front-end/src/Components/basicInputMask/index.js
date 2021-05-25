import React from 'react';
import InputMask from "react-input-mask";

function BasicInputMaskComponent({className, ...props}) {

    const classBase = "w-full py-2 px-2 border-2 border-gray-200 rounded-lg placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-purple-600 transition-colors duration-300";
    return <InputMask className={`${classBase} ${className}` } {...props}/>
}

export default BasicInputMaskComponent;