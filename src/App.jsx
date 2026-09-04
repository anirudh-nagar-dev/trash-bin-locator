import { useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import BinCard from "./Components/BinCard.jsx";
import trashBins from "./data.js";
import Map from "./Components/Map.jsx"

function App() {
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("All");
  const [userLocation,setUserLocation] = useState(null);

  const filteredBins = trashBins.filter((bin) => {
    const matchesSearch = bin.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || bin.status === status;
    return matchesSearch && matchesStatus
});

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
        setUserLocation={setUserLocation} />
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
