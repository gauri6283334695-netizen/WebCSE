// SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.20;

contract HashedVoice {
    struct Candidate {
        uint256 id;          
        string name;        
        uint256 voteCount;   
    }
    address public admin;
    bool public votingOpen;
    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isEligible;

    event CandidateAdded(uint256 indexed id, string name);
    event VotingOpened();
    event VotingClosed();
    event VoterEligibilitySet(address indexed voter, bool allowed);
    event Voted(address indexed voter, uint256 indexed candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier whenVotingOpen() {
        require(votingOpen, "Voting is closed");
        _;
    }

    constructor() {
        admin = msg.sender;       
        votingOpen = false;    
    }

    function addCandidate(string memory _name) external onlyAdmin {
        require(bytes(_name).length > 0, "Empty name");

        candidatesCount += 1;
        uint256 newId = candidatesCount;

        candidates[newId] = Candidate({
            id: newId,
            name: _name,
            voteCount: 0 
        });

        emit CandidateAdded(newId, _name);
    }

    function setEligible(address _voter, bool _allowed) external onlyAdmin {
        isEligible[_voter] = _allowed;
        emit VoterEligibilitySet(_voter, _allowed);
    }

    function openVoting() external onlyAdmin {
        require(!votingOpen, "Already open");
        votingOpen = true;
        emit VotingOpened();
    }

    function closeVoting() external onlyAdmin {
        require(votingOpen, "Already closed");
        votingOpen = false;
        emit VotingClosed();
    }

    function vote(uint256 _candidateId) external whenVotingOpen {
        require(isEligible[msg.sender], "Not eligible to vote");

        require(!hasVoted[msg.sender], "Already voted");

        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate"
        );

        hasVoted[msg.sender] = true;

        candidates[_candidateId].voteCount += 1;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory list = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            list[i - 1] = candidates[i];
        }
        return list;
    }
    function hasAddressVoted(address _addr) external view returns (bool) {
        return hasVoted[_addr];
    }

    function isAddressEligible(address _addr) external view returns (bool) {
        return isEligible[_addr];
    }

    function getCurrentWinner() external view returns (uint winnerId, uint winnerVotes) {
        uint maxVotes = 0;
        uint winningId = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningId = i;
            }
        }
        return (winningId, maxVotes);
    }
}
