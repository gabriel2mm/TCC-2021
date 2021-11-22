import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, ProjectOutlined, EnvironmentOutlined, TableOutlined } from '@ant-design/icons';
import { useActivityViewContext, ActivityViewTypes, useUserContext, useGroupSelectContext } from '../../Contexts';
import moment from 'moment';
import ChartViewComponent from './chartView';
import TableViewComponent from './tableView';
import MapViewComponent from './mapView';
import { Link } from 'react-router-dom';
import { API } from '../../Services';

function ActivitiesViewComponent() {
  const [compData, setCompData] = useState(new Date());
  const contextGroups = useGroupSelectContext();
  const { screen, showModal, activity, handleShowModal, changeActivity, changeViewScreen } = useActivityViewContext();
  const context = useUserContext();

  React.useEffect(() => {
    contextGroups.changeGroup(null, null);
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

  async function updateStatus(status) {
    try {
      const response = await API().get(`/api/activities/status-activity/${activity.id}?status=${status}`);
      if (response.status >= 200 && response.status < 300) {
        message.info("Atividade Iniciada!");
      }
    } catch (e) {
      message.error("Não foi possível atualizar status da atividade");
    }
  }

  function changeDate(direction){
    const dateTmp = contextGroups.date;
    if(direction === 'left'){
      dateTmp.setDate(dateTmp.getDate() - 1);
    }else if(direction === 'right'){
      dateTmp.setDate(dateTmp.getDate() + 1);
    }

    setCompData(dateTmp);
    contextGroups.changeDate(dateTmp);    
  }


  return (
    <div className="w-full h-auto block overflow-y-auto">
      <div className="w-ful flex flex-row justify-between content-start items-center m-5">
        <div className="flex flex-row items-center">
          <button onClick={e=> changeDate("left")} className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300 rounded-full"><CaretLeftOutlined className="text-gray-600" /></button>
          <span className="font-bold text-lg text-gray-800 bg-gray-100 p-1 rounded">{moment(compData).format("DD/MM/yy")}</span>
          <button onClick={e => changeDate("right")} className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300 rounded-full"><CaretRightOutlined className="text-gray-600" /></button>
        </div>
        <div className="flex flex-row float-right">
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.chart)}><ProjectOutlined /></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.table)}><TableOutlined /></button>
          <button className="flex flex-row justifiy-center items-center bg-gray-100 p-1 mx-1 border-2 border-gray-100 hover:bg-gray-200 transition-colors delay-300" onClick={e => changeViewScreen(ActivityViewTypes.map)}><EnvironmentOutlined /></button>
        </div>
      </div>
      {renderScreen()}

      <Modal title="Atividade" visible={showModal} closable={true} onCancel={toggleModal} onBlur={toggleModal} footer={[
        (
          context.containsPermission("Admin") || context.containsPermission("activities") || context.containsPermission("receive:activity") ? (
            <>
              {activity.assigned?.id == context.user.id && activity.status === "ABERTO" ? (
                <Button key="init" onClick={e => updateStatus("EM_ANDAMENTO")}>
                  Iniciar atividade
                </Button>) : (null)}
              ,
              {activity.assigned?.id == context.user.id && activity.status === "EM_ANDAMENTO" ? (
                <Button key="close" type="primary" onClick={e => updateStatus("CONCLUIDO")}>
                  Fechar atividade
                </Button>) : (null)}
            </>
          ) : (null)
        )
        ,
        <Link key="detalhe" className="mx-2" to={`/activities/${activity.id}`}>
          <Button type="primary">
            Detalhe
          </Button>
        </Link>,

      ]}>
        <div className="container">
          <div className="flex flex-col">
            <span><b>Atividade: </b> {activity.number}</span>
            <span><b>criado: </b> {moment(activity.created).format("DD/MM/yy HH:mm")}</span>
            <span><b>data limite: </b> {moment(activity.dateLimit).format("DD/MM/yy HH:mm")}</span>
            <span><b>Status: </b> {activity.status}</span>
            <span><b>Usuário Atribuído: </b> {activity.assigned?.firstName} </span>
            <span><b>Usuário requisitante: </b> {`${activity.requester?.firstName} ${activity.requester?.firstName} - ${activity.requester?.email} `}</span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ActivitiesViewComponent;