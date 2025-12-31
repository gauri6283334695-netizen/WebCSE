import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HashedVoiceModule = buildModule("HashedVoiceModule", (m) => {
  const hashedVoice = m.contract("HashedVoice")
  return { hashedVoice };
});

export default HashedVoiceModule;
