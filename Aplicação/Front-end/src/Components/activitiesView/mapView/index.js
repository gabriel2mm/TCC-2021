import React, {useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { layout } from '../../../Pages/activity/maps/optionsLayout';
import {message} from 'antd';
import {useActivityViewContext, useGroupSelectContext} from '../../../Contexts';
import { API } from '../../../Services';


function MapViewComponent() {
  const { activities } = useGroupSelectContext();
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
                      position={{lat: parseFloat(a.address?.lat), lng: parseFloat(a.address?.lng)}}
                  />
              }
              )}
          </GoogleMap>
          : <></>
      )
  );
}

export default MapViewComponent;