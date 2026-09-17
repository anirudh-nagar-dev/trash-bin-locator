import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import BinCard from "./Components/BinCard.jsx";
import Map from "./Components/Map.jsx"
import calculateDistance from "./distance.js";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("All");
  const [userLocation,setUserLocation] = useState(null);

  const [bins,setBins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [newBin,setNewBin] = useState({
    name : "",
    status: "Available",
    latitude: "",
    longitude: ""
  });
  const [success, setSuccess] = useState(null);
  const [addBinError, setAddBinError] = useState(null);
  const [addingBin, setAddingBin] = useState(false);

  const binsWithDistance = userLocation ? bins.map((bin)=>({
          ...bin,
          distance: calculateDistance(
            userLocation[0],
            userLocation[1],
            bin.latitude,
            bin.longitude
          ),
  }))
  : bins;

  const filteredBins = binsWithDistance.filter((bin) => {
    const matchesSearch = bin.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || bin.status === status;
    return matchesSearch && matchesStatus
}).sort((a,b) => a.distance - b.distance);

useEffect(()=>{
  fetch(`${API_URL}/api/bins`).then((response)=>{
    if(!response.ok){
      throw new Error("Failed to fetch bins");
    }
  return response.json();})
  .then((data)=>{
    setBins(data);
    setLoading(false);
  })
  .catch((err)=>{
    console.error("Error fetching bins: ",err);
    setError("Unable to load bins");
    setLoading(false);
  });
},[]); 

const handleStatusChange = async (id, newStatus)=>{
  try{
    const response = await fetch(`${API_URL}/api/bins/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: newStatus
      })
    });
    const updatedBin = await response.json();
    if(!response.ok){
      console.error("Failed to update bin: ",updatedBin);
      return;
    }
    setBins((currentBins)=>
    currentBins.map((bin)=>
    bin.id===id ? updatedBin : bin));
  } catch(error){
    console.error("Status update error: ",error);
  }
};
const handleAddBin = async (event) =>{
  event.preventDefault();
  setAddBinError(null);
  setSuccess(null);
  if(!newBin.name.trim() ||
     newBin.latitude === "" ||
     newBin.longitude === ""){
      setAddBinError("Please fill in all fields.");
      return;
     }
     if (
  newBin.latitude < -90 ||
  newBin.latitude > 90 ||
  newBin.longitude < -180 ||
  newBin.longitude > 180
) {
  setAddBinError("Please enter valid latitude and longitude.");
  return;
}
     setAddingBin(true);
  try{
    const response = await fetch(`${API_URL}/api/bins/${id}`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newBin,
        latitude: Number(newBin.latitude),
        longitude: Number(newBin.longitude)
      })
    });
    const createdBin = await response.json();
    if(!response.ok){
      console.error("Failed to add bin: ", createdBin);
      setAddBinError(createdBin.message || "Failed to add bin");
      return;
    }
    setBins((currentBins)=>[...currentBins,createdBin]);
    setSuccess("Bin added successfully!");
    setTimeout(()=>{
      setSuccess(null);
    },3000);
    setNewBin({
       name: "",
       status: "Available",
       latitude: "",
       longitude: ""
    });
  } catch(error){
    console.error("Add bin error:", error);
    setAddBinError("Unable to add bin. Please try again.");
  }finally {
  setAddingBin(false);
}
};
  return (
    <div>
      <Navbar />
      <main>
        <section className="hero">
          <h1>Welcome to TrashBin Locator</h1>
          <p>Find nearby trash bins with ease.</p>
          <input type="text" placeholder="Search trash bins.." 
          value={search}
           onChange={(event) => setSearch(event.target.value)}/>
          <select value={status} onChange={(event)=>setStatus(event.target.value)}>
          <option value="All">All Bins</option>
          <option value="Available">Available</option>
          <option value="Almost Full">Almost FUll</option>
          <option value="Full">Full</option>
          </select>
        </section>
        <section className="add-bin">
          <h2>Add a New Bin</h2>
          {success && (
            <div className="success-message">
              ✅ {success}
            </div>
          )}

          {addBinError && (
            <div className="error-message">
            ⚠️ {addBinError}
            </div>
          )}
          <form onSubmit={handleAddBin}>
            <input type="text" placeholder="Bin name"
             value={newBin.name} 
             onChange={(event)=>setNewBin({...newBin,name: event.target.value})}/>
            <select value={newBin.status} onChange={(event)=>setNewBin({...newBin,status: event.target.value})}>
              <option value="Available">Available</option>
              <option value="Almost Full">Almost Full</option>
              <option value="Full">Full</option>
            </select>
            <input type="number" placeholder="Latitude"
             value={newBin.latitude} 
             onChange={(event)=>setNewBin({...newBin,latitude: event.target.value})} />
            <input type="number" placeholder="Longitude" 
            value={newBin.longitude} 
            onChange={(event)=>setNewBin({...newBin,longitude: event.target.value})} />

            <button type="submit" disabled={addingBin}>
              {addingBin? "Adding ..." : "Add Bin"}
            </button>
          </form>
        </section>
        <Map userLocation={userLocation} 
        setUserLocation={setUserLocation} 
        bins = {bins}
        />
        <section className="bin-list">
          {error?<div className="error-message">⚠️{error}<br/>
            <button onClick={() => window.location.reload()}>
             Retry
           </button>
          </div>:loading?<p>Loading Bins...</p>:filteredBins.length>0 ?(filteredBins.map(
            (bin) => (
              <BinCard 
              key={bin.id} 
              bin={bin} 
              userLocation={userLocation} 
              onStatusChange={handleStatusChange}
              />
            ))):(<p>No trash bins found.</p>)}
        </section>
      </main>

    </div>
  );
}

export default App
