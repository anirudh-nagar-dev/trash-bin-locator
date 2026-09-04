import trashBins from "../data.js";
import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import calculateDistance from "../distance.js";

function MapUpdater({userLocation}){
    const map = useMap();

    useEffect(()=>{
    if(userLocation){
        map.setView(userLocation, 15);
    }
  },[userLocation, map]);

    return null;
}

function Map({ userLocation,setUserLocation }) {

    useEffect(() =>{
    navigator.geolocation.getCurrentPosition((position)=>{
        setUserLocation([position.coords.latitude,position.coords.longitude]);
    });
}, []);
    return (
        <MapContainer
        center = {[28.6139, 77.2090]}
        zoom = {13}
        style = { { height: "400px", width: "100%" } }
        >
        <MapUpdater userLocation = {userLocation} />
            <TileLayer
            attribution='&copy;OpenStreetMap contributors'
            
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
            {trashBins.map((bin)=>{
                const distance = userLocation 
                 ? calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    bin.latitude,
                    bin.longitude
                  )
                 : null;
                 
                return(
                <Marker
                key = {bin.id}
                position={[bin.latitude,bin.longitude]}>
                    <Popup>
                        <strong>{bin.name}</strong>
                        <br/>
                        📍 {bin.location}
                        <br/>
                        🟢 Status: {bin.status}
                        <br/>
                        📏 {distance != null ?
                        distance.toFixed(2) : "..."} km away
                    </Popup>
                </Marker>
                );
            })}
            {userLocation && (
                <Marker
                position={userLocation}>
                    <Popup>
                        You are here
                    </Popup>
                </Marker>
            )}
           
        
        </MapContainer>
    );
}

export default Map;