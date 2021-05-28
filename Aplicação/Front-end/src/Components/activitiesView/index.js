import React, { useState, useMemo, useEffect } from 'react';
import { message } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import "./style.css";

function ActivitiesViewComponent() {

  const [headers, setHeaders] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const tmpHeaders = [];
  const initialDate = useMemo(() => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(1);

    return date;
  }, []);

  const endDate = useMemo(() => {
    const date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);

    return date;
  }, [])

  const difHours = 24;

  function padStart(number, digits = 2, emptyDigit = 0) {
    let length = 0;
    let n = Math.abs(number);
    let absoluteNumber = n;
    do {
      n /= 10;
      length++;
    } while (n >= 1);
    const prefix = Array(Math.max((digits - length) + 1, 0)).join(emptyDigit);
    return number < 0 ? `-${prefix}${absoluteNumber}` : prefix + number;
  }

  function getHead() {
    for (var i = 0; i < difHours; i++) {
      tmpHeaders.push({ hour: padStart(i, 2, 0) });
    }

    setHeaders(tmpHeaders);
  }


  useEffect(() => {
    const response = axios.get("https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/viewActivit");
    response.then(res => {
      setDataSource(res.data)
      getHead();
      renderItem();
    }).catch(err => message.error("Não foi possível capturar os dados"));
  }, [])


  function renderItem(hour) {

    return dataSource.map((resources, i) => {
      return resources.acitivities.map((activity, j) => {
        const row = i + 2;
        const activityHour = padStart(parseInt(new Date(activity.created).getHours()), 2, 0);

        if (hour === activityHour) {
          return (
            <div className="h-16 bg-green-400 rounded-lg absolute" style={{ top: "calc(1.5rem + 1.25rem + " + i + " * 4rem)", "width": "calc(100%)", gridRowStart: row }}></div>
          )
        }
      });
    });
  }

  return (
    <div className="w-full h-auto block overflow-y-auto">
      <div className="w-ful flex flex-row justify-between content-start items-center m-5">
        <div className="flex flex-row items-center">
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300 rounded-full"><CaretLeftOutlined className="text-gray-600" /></button>
          <span className="font-bold text-lg text-gray-800 bg-gray-100 p-1 rounded">{moment(new Date()).format("DD/MM/yyyy")}</span>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300 rounded-full"><CaretRightOutlined className="text-gray-600" /></button>
        </div>
        <div className="flex flex-row float-right">
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300"></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300"></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300"></button>
        </div>
      </div>

      <div id="grid-view" className={`relative w-full py-1 h-auto min-h-screen grid grid-cols-${difHours + 2} grid-rows-none overflow-y-auto`}>
        <div className="row-start-1 item col-span-2 text-lg text-gray-800 text-center">
          <div className="mb-5">Recursos</div>
          {dataSource.map((data, index) => (
            <>
              <div className={`${index % 2 === 0 ? "bg-items" : ""} absolute w-full h-16 -mt-1`}></div>
              <div key={index} className="h-16 flex flex-row justify-center items-center" style={{ gridRowStart: index + 2 }}>{data.Recurso}</div>
            </>
          )

          )}
        </div>
        {headers.map((hour, index) =>
          <div key={index} className="mb-5 row-start-1 item relative" id={`head-${hour.hour}`} data-key={hour.hour}>
            <span className="flex flex-row justify-center items-center rounded-full bg-gray-400 text-white w-6 h-6">{hour.hour}</span>
            {renderItem(hour.hour)}
          </div>
        )}

      </div>
    </div>
  );
}

export default ActivitiesViewComponent;