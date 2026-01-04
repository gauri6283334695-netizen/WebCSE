# HashedVoice 
A Blockchain-based Secure Voting System

##  Problem Statement
Usually voting systems suffer from issues such as lack of transparency, vote tampering, duplicate voting, and centralized control. This project aims to build a secure, transparent voting system using blockchain technology while maintaining a simple web-based user experience.

##  Project Overview
HashedVoice is a full-stack decentralized voting application where:
- Voters register using their wallet address and admission number
- Voter eligibility is verified via backend logic and blockchain
- Votes are recorded immutably on the blockchain
- Results are calculated transparently once voting closes

The system ensures:
- One person → one vote
- No duplicate voting
- Complete auditability

##  Tech Stack

### Frontend
- Next.js (App Router)
- React
- Ethers.js
- CSS (no Tailwind)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Ethers.js

### Blockchain
- Solidity
- Hardhat
- Local Hardhat Network
- MetaMask

##  Features

###  Voter
- Wallet connection using MetaMask
- Admission number validation using regex
- Automatic eligibility verification
- Vote once only
- Real-time vote count visibility
- Rejected at registration if already voted

###  Admin
- Add candidates
- Open voting
- Close voting
- View final results

###  Blockchain Security
- Immutable vote storage
- Eligibility enforced via smart contract
- Vote-once logic enforced at contract level

##  Setup and installation instructions

git clone https://github.com/gauri6283334695-netizen/WebCSE
cd HashedVoice

###  Backend
- cd Backend
- npm install
- npm run start

###  Blockchain
- cd Blockchain
- npm install
- npx hardhat node
- npx hardhat ignition deploy ./ignition/modules/HashedVoiceModule.js --network localhost

###  Frontend
- cd Frontend
- npm install
- npm run dev

