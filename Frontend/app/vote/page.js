"use client";
import "./page.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../../src/lib/hashedVoice.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function VotePage() {
  const [candidates, setCandidates] = useState([]);

  const loadCandidates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

      const list = await contract.getCandidates();
      console.log(list);
      setCandidates(list);
    } catch (err) {
      console.error("LOAD ERROR:", err);
      alert(err.message);
    }
  };

  const vote = async (id) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      const tx = await contract.vote(id);
      await tx.wait();

      alert("Vote recorded!");
      loadCandidates();
    } catch (err) {
      alert(err.reason || err.message);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  return (
  <div className="vote-container">

      <h3 className="title">Vote Candidates</h3>

      {candidates.length === 0 ? (
        <p className="no-data">No candidates found.</p>
      ) : (
        <div className="candidate-grid">
          {candidates.map((c, index) => (
            <div className="candidate-card" key={index}>
              <h3 className="candidate-name">{c.name}</h3>
              <p className="candidate-votes">Votes: {String(c.voteCount)}</p>

              <button className="vote-btn" onClick={() => vote(c.id)}>
                Vote
              </button>
            </div>
          ))}
        </div>
      )}

  </div>
);

}
