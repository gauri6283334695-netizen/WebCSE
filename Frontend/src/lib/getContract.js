import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractConfig";

export async function getContract() {
  if (typeof window === "undefined") {
    throw new Error("Window not available");
  }

  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("MetaMask not found");
  }

  await window.ethereum.request({
  method: "wallet_switchEthereumChain",
  params: [{ chainId: "0x7A69" }] 
  });

  const provider = new ethers.BrowserProvider(ethereum);

  const network = await provider.getNetwork();
  console.log("Connected chainId:", network.chainId.toString());

  const code = await provider.getCode(CONTRACT_ADDRESS);
  if (code === "0x") {
    throw new Error("No contract deployed at this address on this network");
  }

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
}
