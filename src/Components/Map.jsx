import trashBins from "../data.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
    return (
        <MapContainer
        center = {[28.6139, 77.2090]}
        zoom = {13}
        style = { { height: "400px", width: "100%" } }
        >
            <TileLayer
            attribution='&copy;OpenStreetMap contributors'
            
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
            {trashBins.map((bin)=>(
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
                        📏 {bin.distance} km away
                    </Popup>
                </Marker>
            ))}
           
        
        </MapContainer>
    );
}

export default Map;