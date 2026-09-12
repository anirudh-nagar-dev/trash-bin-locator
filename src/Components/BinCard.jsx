import calculateDistance from "../distance.js";
import { useState } from "react";


function BinCard({ bin, userLocation, onStatusChange }){
    const [updating,setUpdating] = useState(false);
    let statusStyle = {
        color: "white",
        backgroundColor: "#15803d",
    };
    if(bin.status === "Almost Full"){
        statusStyle = {
            color: "white",
            backgroundColor: "#facc15",
        };
    }
    else if(bin.status === "Full"){
        statusStyle = {
            color: "white",
            backgroundColor: "#dc2626",
        };
    }
    const distance = userLocation
     ? calculateDistance(
        userLocation[0],
        userLocation[1],
        bin.latitude,
        bin.longitude
      )
     : null; 
     const handleStatusChange = async (event) => {
        setUpdating(true);
        await onStatusChange(bin.id,event.target.value);
        setUpdating(false);
     };
    return (
        <div className="bin-card">
            <h2>🗑️ {bin.name}</h2>
            <p>📏 {distance != null ? distance.toFixed(2) : "..."} km away</p>
            <div className="status" style={statusStyle}>
                ♻️ Status: <select value={bin.status} onChange={handleStatusChange} disabled={updating}>
                    <option value="Available">Available</option>
                    <option value="Almost Full">Almost Full</option>
                    <option value="Full">Full</option>
                    </select>
            </div>
            <button onClick = {()=> 
                window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${bin.latitude},${bin.longitude}`,"_blank"
                )
                }
            >
             Get Directions</button>


        </div>
    );
}

export default BinCard;