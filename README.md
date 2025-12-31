<<<<<<< HEAD
# 🗳️ HashedVoice – Blockchain Based Voting System

HashedVoice is a decentralized voting application built using **Blockchain (Ethereum / Hardhat)**, **Next.js**, and **Node.js (Express)**.  
It ensures transparent, secure, and one-person-one-vote elections.

---

## 📁 Project Structure
HashedVoice/
│
├── Backend/ # Express + MongoDB backend
├── Blockchain/ # Smart contracts (Hardhat)
├── Frontend/ # Next.js frontend
├── .gitignore
└── README.md


---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Ethers.js
- CSS (no Tailwind)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Ethers.js

### Blockchain
- Solidity
- Hardhat
- Hardhat Ignition
- Ethereum (Local Hardhat Network)

---

## 🔐 Core Features

- Wallet-based voter registration
- Regex-based admission validation
- Admin-controlled eligibility
- One wallet → one vote (enforced on-chain)
- Live vote count
- Voting open/close control
- Result & winner display
- Backend + blockchain verification

---

## 🚀 How to Run the Project

### Blockchain (Hardhat)

cd Blockchain
npm install
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/HashedVoiceModule.js --network localhost <!-- to deploy contract (on new terminal) -->

### Backend

cd Backend 
npm install 
npm run start

### Frontend 

cd Frontend
npm install
npm run dev

=======
# WebCSE
>>>>>>> 4c1db111690f529c84a76f84f9be3d6b9be277bb
