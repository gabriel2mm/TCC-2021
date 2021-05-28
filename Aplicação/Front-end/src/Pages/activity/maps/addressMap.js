import React  from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { layout } from './optionsLayout';

function AdressMapComponent({ location, showMarker }) {
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAqlZil13PZoeh3agIbqcRpxf7mdMwDJ_0"
    });

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    return (
        isLoaded ?
            <GoogleMap
                zoom={10}
                center={location}
                mapContainerStyle={containerStyle}
                options={{ styles: layout, disableDefaultUI: true, zoomControl: true }}>
                {showMarker && location.lat !== null && location.lng !== null ? (
                    <Marker key={new Date().getTime().toString()}
                        position={location}
                    />
                ) : null}
            </GoogleMap>
            : <></>
        )
}

export default AdressMapComponent;