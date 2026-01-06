##  Project Structure

HashedVoice/
│
├── Frontend/        
├── Backend/        
├── Blockchain/     
├── README.md
├── TECHNICAL_SUMMARY.md
└── .gitignore

##  Architecture Overview

HashedVoice follows a three-layer architecture:

1.Frontend (Next.js)
   - User interaction layer
   - Wallet connection
   - Displays candidates, voting UI

2.Backend (Node.js + Express)
   - Admission number validation (regex)
   - Stores voter data in MongoDB
   - Prevents re-registration after voting
   - Calls blockchain functions using admin wallet

3.Blockchain (Solidity + Hardhat)
   - Maintains candidates
   - Controls voting process
   - Enforces one person one vote
   - Stores vote counts immutably

##  Blockchain Features Implemented

### Smart Contract Capabilities
- Candidate management
- Voting open/close control
- One-vote-per-address enforcement

### Why Blockchain?
- Prevents vote tampering
- Ensures transparency
- Eliminates centralized authority

##  Admission Verification Logic
- Regex Pattern Used: 25[Jj][Ee][0-9]{4}
- Validation occurs on backend
- Invalid users are rejected before blockchain interaction

##  Database Usage (MongoDB)
- Stores:
  - Name
  - Admission Number
  - Wallet Address
  - Voting status
- Used to:
  - Block duplicate registrations
  - Reject users who already voted

##  Third-Party Libraries & Tools
- ethers.js
- mongoose
- express
- hardhat
- dotenv

##  AI Usage 
- ChatGPT used for:
  - Concept clarification
  - Debugging guidance
  - Code structure understanding
  - Improve UI 

##  Youtube videos
- for learning solidity, concept of hardhat, database connection and react that used in project

##  Mentor Guidance
- Mentors provided:
  - Conceptual guidance
  - Debugging hints
  - Architectural suggestions

##  APIs Used
- Ethereum JSON-RPC (local Hardhat network)
- MetaMask Wallet API

##  Design Decisions
- Blockchain for voting logic 
- Backend for validation 
- MongoDB for persistence 
- No Tailwind,CSS for clarity

##  Final Outcome
- Secure decentralized voting
- Real-world blockchain integration
- Compliance with Recruitathon rules

