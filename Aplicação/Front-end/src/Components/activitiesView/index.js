import React from 'react';
import { Modal, Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, ProjectOutlined, EnvironmentOutlined, TableOutlined } from '@ant-design/icons';
import { useActivityViewContext, ActivityViewTypes } from '../../Contexts';
import moment from 'moment';
import ChartViewComponent from './chartView';
import TableViewComponent from './tableView';
import MapViewComponent from './mapView';
import { Link } from 'react-router-dom';


function ActivitiesViewComponent() {
  const { screen, showModal, activity, handleShowModal, changeActivity, changeViewScreen } = useActivityViewContext();

  React.useEffect(() => {
    console.log(screen, changeViewScreen, changeActivity, handleShowModal);
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

  function toggleModal() {
    handleShowModal();
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

      <Modal title="Atividade" visible={showModal} closable={true} onCancel={toggleModal} onBlur={toggleModal} footer={[
        <Button key="init">
          Iniciar atividade
        </Button>,
        <Button key="close" type="primary">
          Fechar atividade
        </Button>,
        <Link key="detalhe" className="mx-2" to={`/activities/${activity.id}`}>
          <Button type="primary">
            Detalhe
          </Button>
        </Link>,

      ]}>
        <div className="container">
          <div className="flex flex-col">
            <span><b>Atividade: </b> {activity.activity}</span>
            <span><b>criado: </b> {moment(activity.created).format("DD/MM/yy HH:mm")}</span>
            <span><b>data limite: </b> {moment(activity.limite).format("DD/MM/yy HH:mm")}</span>
            <span><b>Status: </b> {activity.status}</span>
            <span><b>Usuário Atribuído: </b> {activity.request} </span>
            <span><b>Usuário requisitante: </b> {activity.request}</span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ActivitiesViewComponent;