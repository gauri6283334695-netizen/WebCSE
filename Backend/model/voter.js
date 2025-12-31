import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: String,
  admission: { type: String, unique: [true, "Admission number already exists"] },
  walletAddress: { type: String, unique:true },})

export default mongoose.model("Voter", voterSchema);
