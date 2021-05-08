import React from 'react';
import { Link } from 'react-router-dom';

function SettingsComponent({ dataSource }) {

    const data = dataSource || [];

    return (
        data.map((d, i) => {
            return (
                <div className="flex flex-col justify-items-start md:mx-20 md:pl-14 mt-5" key={`${d.title}-${i}`}>
                    <h1 className="text-gray-600 font-bold">{d.title}</h1>
                    <div className="flex flex-row justify-items-start overflow-x-auto my-2">
                        {d.balloons.map( (b, i) => {
                            return (
                                <Link to={b.link} key={`${b.title}-${i}`} >
                                    <div className="flex flex-col justify-items-center ml-10 ">
                                        <div className={`w-16 h-16 rounded-full mx-5 ${b.color} flex flex-row items-center justify-center text-white text-4xl`}>{b.icon}</div>
                                        <span className="font-medium text-black text-center mt-1">{b.title}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="w-full h-0.5 bg-gray-200 rounded"></div>
                </div>)
        })
    );
}

export default SettingsComponent;