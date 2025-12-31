"use client";
import "./page.css"
import { useState } from "react";
import { getContract } from "@/src/lib/getContract";

export default function AdminPage() {
  const [candidateName, setCandidateName] = useState("");
  const [status, setStatus] = useState("");
   const [voterAddr, setVoterAddr] = useState("");

  async function addCandidate() {
    try {
      setStatus("Waiting for MetaMask...");
      const contract = await getContract();

      const tx = await contract.addCandidate(candidateName);
      await tx.wait();

      setStatus("Candidate added successfully");
      setCandidateName("");
    } catch (err) {
      console.error(err);
      setStatus(err.reason || err.message || "Transaction failed");
    }
  }

  async function openVoting() {
    try {
      setStatus("Opening voting...");
      const contract = await getContract();

      const tx = await contract.openVoting();
      await tx.wait();

      setStatus("Voting opened");
    } catch (err) {
      console.error(err);
      setStatus(err.reason || err.message);
    }
  }
  async function closeVoting() {
    try {
      setStatus("Closing voting...");
      const contract = await getContract();

      const tx = await contract.closeVoting();
      await tx.wait();

      setStatus("Voting closed");
    } catch (err) {
      console.error(err);
      setStatus(err.reason || err.message);
    }
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <input
        className="admin-input"
        placeholder="Candidate name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />

      <button className="admin-btn" onClick={addCandidate}>Add Candidate</button>

      <button className="admin-btn open" onClick={openVoting}>Open Voting</button>
      <button className="admin-btn close" onClick={closeVoting}>Close Voting</button>

      <p className="status">{status}</p>
    </div>
  );
}
