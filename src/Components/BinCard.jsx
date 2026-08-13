function BinCard({bin}){
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
    return (
        <div className="bin-card">
            <h2>🗑️ {bin.name}</h2>

            <p>📍 {bin.location}</p>
            <p>📏 {bin.distance} km away</p>
            <p className="status" style={statusStyle}>
                ♻️ Status: {bin.status}
            </p>
            <button onClick = {()=> window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bin.location)}`,"_blank")}>
             Get Directions</button>


        </div>
    );
}

export default BinCard;