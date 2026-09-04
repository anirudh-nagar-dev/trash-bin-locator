import calculateDistance from "../distance.js";


function BinCard({ bin,userLocation }){
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



    return (
        <div className="bin-card">
            <h2>🗑️ {bin.name}</h2>

            <p>📍 {bin.location}</p>
            <p>📏 {distance != null ? distance.toFixed(2) : "..."} km away</p>
            <p className="status" style={statusStyle}>
                ♻️ Status: {bin.status}
            </p>
            <button onClick = {()=> window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bin.location)}`,"_blank")}>
             Get Directions</button>


        </div>
    );
}

export default BinCard;