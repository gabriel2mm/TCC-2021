import { Skeleton } from "antd";
import React, { useState } from "react";
import bglogo from "../../Assets/images/bglogo.jpg";

function LoginLayoutComponent({ children }) {
    const [imageState, setImageState] = useState(false);
    
    function onloadImage(){
        setImageState(true);
    }  

    return (
    <div className="h-screen min-h-full w-full grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-3">
      <div className="w-full min-h-full bg-white flex flex-row justify-center items-center relative">
        <img src={bglogo} alt="imagem de fundo do logo" onLoad={onloadImage} className={`${!imageState ? "hidden" : ""} w-full h-full absolute object-cover`}/>
        {!imageState ? (<Skeleton.Image active={true} loading={true} title="Imagem de fundo" className="flex justify-center items-center w-full h-full absolute object-cover"/>) : null}
        <div className="absolute w-full h-full bg-black opacity-60"></div>
        <h1 className="absolute top-1/2 transform -translate-y-1/2 text-xl sm:text-3x1 md:text-2xl lg:text-4xl subpixel-antialiased font-extralight tracking-wide leading-tight text-center text-white drop-shadow">
          Field Service Cloud
        </h1>
      </div>
      <div className="row-span-2 sm:row-span-2 md:row-span-1 md:col-span-2 sm:col-span-1 flex flex-1 justify-center items-center bg-gray-200">
        <div className="w-full h-auto md:rounded-2xl md:shadow-lg sm:m-16 lg:m-24 xl:m-48 md:m-10  bg-gray-200 md:bg-gray-100">
          <div className="px-10 py-10 flex flex-col flex-shrink-0 justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayoutComponent;
