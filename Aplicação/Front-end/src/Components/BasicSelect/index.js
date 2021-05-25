import React from 'react';
import {Empty} from 'antd';
import {BasicInputComponent} from '../index';

function BasicSelectComponent({ dataSource, defaultOption,  className, props, disabled, value }) {

  const classBase = "w-full px-2 py-2 border-2 border-gray-200 rounded-lg placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-purple-600 transition-colors duration-300";
  return (
    disabled ? (<BasicInputComponent {...props} value={value} disabled/>) : (<select {...props} className={`${className} ${classBase}`}>
    {(defaultOption === true) ? (  <option value="" disabled selected>Selecione uma opção</option>) : null}
    {dataSource ? (
      dataSource.map((d,i) => <option key={i} value={d.value}>{d.option}</option>)
    ) : (<Empty />)}
    </select>)
  );
}

export default BasicSelectComponent;