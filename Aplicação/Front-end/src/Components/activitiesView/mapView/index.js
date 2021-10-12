import React, {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { layout } from '../../../Pages/activity/maps/optionsLayout';
import axios from 'axios';
import {message} from 'antd';
import {useActivityViewContext} from '../../../Contexts';


function MapViewComponent() {
  const [activities, setActivities] = useState([]);
  const [initialLocation, setInitialLocation] = useState({ lat: -25.475174 || 0, lng: -49.2807627 || 0 });
  const { screen, showModal, activity, handleShowModal, changeActivity, changeViewScreen } = useActivityViewContext();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAqlZil13PZoeh3agIbqcRpxf7mdMwDJ_0"
  });

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    async function fetchActivities(){
        const response = await axios.get("https://60727341e4e0160017ddea55.mockapi.io/tcc/api/users/Organization/1/category/1/activity");
      
        try{
          if(response.status >= 200 && response.status < 300){
            console.log(response.data)
            setActivities(response.data);
          }
        }catch(e){
          message.error("Não foi possível carregar as atividades");
        }
    }

    fetchActivities();
  }, [])

  function toggleActivity(activity) {
    changeActivity(activity);
    handleShowModal();
  }


  return (
    (
      isLoaded ?
          <GoogleMap
              zoom={2}
              center={initialLocation}
              mapContainerStyle={containerStyle}
              options={{ styles: layout, disableDefaultUI: true, zoomControl: true }}>
              {activities.map( (a,i ) => {
                return <Marker key={`map-${i}`} onClick={() => toggleActivity(a)}
                      position={{lat: parseFloat(a.lat), lng: parseFloat(a.lng)}}
                  />
              }
              )}
          </GoogleMap>
          : <></>
      )
  );
}

export default MapViewComponent;