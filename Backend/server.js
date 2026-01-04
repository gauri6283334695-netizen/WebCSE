import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { ethers } from "ethers";
import Voter from "./model/voter.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ABI_PATH = path.join(__dirname, "../Frontend/src/lib/hashedVoice.json");
const ABI = JSON.parse(fs.readFileSync(ABI_PATH, "utf-8"));

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

connectDB().then(async () => {
  console.log("Clearing old voters...");
  await Voter.deleteMany({});
  console.log("Voter collection cleared.");
});

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;   
const wallet = new ethers.Wallet(adminPrivateKey, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS, 
  ABI.abi, 
  wallet
);

app.post("/voter/register", async (req, res) => {
  const { name, admission, walletAddress } = req.body;
  console.log("Received:", req.body);

  const pattern = /^25[Jj][Ee][0-9]{4}$/;
  if (!pattern.test(admission)) {
    return res.status(400).json({
      success: false,
      message: "Invalid admission number format!"
    });
  }
  
  try {
    const tx = await contract.setEligible(walletAddress, true);
    await tx.wait();

    await Voter.create({
      name,
      admission,
      walletAddress,
      hasVoted: false
    });

    return res.json({
      success: true,
      message: "Voter registered & eligible!"
    });

  } catch (err) {
    console.log("Blockchain Error:", err);
    return res.status(500).json({
      success: false,
      message: "Blockchain error: " + err.message,
    });
  }
})
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(process.env.PORT, () =>
  console.log(`Backend running on http://localhost:${process.env.PORT}`)
);
