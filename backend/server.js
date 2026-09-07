import express from "express";
import cors from "cors";


const app = express();

const PORT = 5000;

const bins = [
  {
    id: 1,
    name: "Main Gate Bin",
    location: "near College Main Gate",
    status: "Available",
    latitude: 28.6145,
    longitude: 77.2095
  },
  {
    id: 2,
    name: "Library Bin",
    location: "next to the Library",
    status: "Almost Full",
    latitude: 28.6155,
    longitude: 77.2105
  },
  {
    id: 3,
    name: "Cafeteria Bin",
    location: "Near College Cafeteria",
    status: "Available",
    latitude: 28.6135,
    longitude: 77.2085
  },
  {
    id: 4,
    name: "Ground Bin",
    location: "College Ground Corner",
    status: "Full",
    latitude: 28.6125,
    longitude: 77.2075
  }];

app.use(cors({origin:'http://localhost:5173'}));

app.get("/", (req,res) => {
    res.send("Trash Bin Locator Backend working");
});
app.get("/api/bins",(req,res)=>{
    res.json(bins);
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});