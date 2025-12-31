"use client";
import "./page.css";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [adm, setAdm] = useState("");

  async function connectWalletAndRegister() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const walletAddress = accounts[0];

    console.log("CLICKED — sending request now...");
    const res = await fetch("http://localhost:5000/voter/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        admission: adm,
        walletAddress,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    if (data.success === true) {
      console.log("Admission verified, redirecting to /vote");
      window.location.href = "/vote";
    }
    }

  return (
    <div className="reg-container">
      <h1 className="reg-title">Voter Registration</h1>

      <input
        className="reg-input"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="reg-input"
        placeholder="Admission No"
        onChange={(e) => setAdm(e.target.value)}
      />

      <button className="reg-btn" onClick={connectWalletAndRegister}>
        Connect Wallet
      </button>
    </div>
  );
}
