import React from 'react';
import { CaretLeftOutlined, CaretRightOutlined, ProjectOutlined, EnvironmentOutlined, TableOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useActivityViewContext, ActivityViewTypes } from '../../Contexts';
import ChartViewComponent from './chartView';
import TableViewComponent from './tableView';
import MapViewComponent from './mapView';


function ActivitiesViewComponent() {
  const { screen, changeViewScreen } = useActivityViewContext();
  React.useEffect(() => {
    console.log(screen, changeViewScreen);
  }, []);

  function renderScreen() {
    switch (screen) {
      case ActivityViewTypes.chart:
        return (<ChartViewComponent />)
      case ActivityViewTypes.map:
        return (<MapViewComponent />)
      case ActivityViewTypes.table:
        return (<TableViewComponent />)
      default:
        return (<ChartViewComponent />)
    }
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
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.chart)}><ProjectOutlined /></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.table)}><TableOutlined /></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.map)}><EnvironmentOutlined /></button>
        </div>
      </div>
      {renderScreen()}

    </div>
  )
}

export default ActivitiesViewComponent;