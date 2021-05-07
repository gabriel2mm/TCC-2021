import React from 'react';
import { Link } from 'react-router-dom';

function SettingsComponent({ dataSource }) {

    const data = dataSource || [];

    return (
        data.map((d, i) => {
            return (
                <div className="flex flex-col justify-items-start pl-14" key={`${d.title}-${i}`}>
                    <h1 className="text-2xl text-gray-800 font-bold my-5 ml-6">{d.title}</h1>
                    <div className="flex flex-row justify-items-start overflow-x-auto">
                        {d.balloons.map( (b, i) => {
                            return (
                                <Link to={b.link} key={`${b.title}-${i}`} >
                                    <div className="flex flex-col justify-items-center">
                                        <div className={`w-20 h-20 rounded-full mx-5 ${b.color} flex flex-row items-center justify-center text-white text-4xl`}>{b.icon}</div>
                                        <span className="font-bold text-gray-500 text-center mt-1">{b.title}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="w-full h-0.5 bg-gray-200 mt-5 rounded"></div>
                </div>)
        })
    );
}

export default SettingsComponent;