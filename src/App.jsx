import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import BinCard from "./Components/BinCard.jsx";
import Map from "./Components/Map.jsx"
import calculateDistance from "./distance.js";

function App() {
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("All");
  const [userLocation,setUserLocation] = useState(null);

  const [bins,setBins] = useState([]);

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
  fetch("http://localhost:5000/api/bins").then((response)=>
  response.json())
  .then((data)=>{
    setBins(data);
  });
},[]); 

console.log("backend bins:" ,bins);
  return (
    <div>
      <Navbar />
      <main>
        <section className="hero">
          <h1>Welcome to TrashBin Locator</h1>
          <p>Find nearby trash bins with ease.</p>
          <input type="text" placeholder="Search trash bins.." value={search} onChange={(event) => setSearch(event.target.value)}/>
          <select value={status} onChange={(event)=>setStatus(event.target.value)}>
          <option value="All">All Bins</option>
          <option value="Available">Available</option>
          <option value="Almost Full">Almost FUll</option>
          <option value="Full">Full</option>
          </select>
        </section>
        <Map userLocation={userLocation} 
        setUserLocation={setUserLocation} 
        bins = {bins}
        />
        <section className="bin-list">
          {filteredBins.length>0 ?(filteredBins.map(
            (bin) => (
              <BinCard key={bin.id} bin={bin} userLocation={userLocation} />
            ))):(<p>No trash bins found.</p>)}
        </section>
      </main>

    </div>
  );
}

export default App
