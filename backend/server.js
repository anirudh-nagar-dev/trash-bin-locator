import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Bin from "./models/Bin.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=>
console.error("MongoDb connection failed: ",error));

const app = express();

const PORT = 5000;


app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

app.get("/", (req,res) => {
    res.send("Trash Bin Locator Backend working");
});
app.get("/api/bins", async (req,res)=>{
  try{ const bins = await Bin.find(); 
   res.json(bins);} catch(error){
    res.status(500).json({message: "Failed to fetch bins"});
   }
});

app.patch("/api/bins/:id", async (req,res) =>{
  try{
    const bin = await Bin.findOneAndUpdate(
      { id: Number(req.params.id) },
      { status: req.body.status },
      { new: true,
        runValidators: true
       }
    );
    if(!bin){
      return res.status(404).json({
        message: "Bin not found"
      });
    }
    res.json(bin);
  } catch(error){
    console.error("patch error: ",error);
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/bins",async(req,res)=>{
  try{
    const newBin = await Bin.create(req.body);
    res.status(201).json(newBin);
  }catch(error){
    console.error("POST ERROR: ",error);
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/bins/:id", async (req,res)=>{
  try{const bin = await Bin.findOneAndDelete({
    id: Number(req.params.id)
  });
  if(!bin){
    return res.status(404).json({ message: "Bin not found" });
  }
  res.json({ message: "Bin deleted successfully", bin });
} catch(error){
  console.error("DELETE ERROR: ",error)
  res.status(500).json({ message: "Failed to delete bin" });
}
});


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});