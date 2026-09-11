import calculateDistance from "../distance.js";


function BinCard({ bin, userLocation, onStatusChange }){
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
     const handleStatusChange = (event) => {
        onStatusChange(bin.id,event.target.value);
     };
    return (
        <div className="bin-card">
            <h2>🗑️ {bin.name}</h2>

            <p>📍 {bin.location}</p>
            <p>📏 {distance != null ? distance.toFixed(2) : "..."} km away</p>
            <div className="status" style={statusStyle}>
                ♻️ Status: <select value={bin.status} onChange={handleStatusChange}>
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