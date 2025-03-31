/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x0a4abcd83E7536C51c796356Ea41c2Eb4C92eba1";
const ABI = [
  "function showOwner() external view returns (address)"
];

const OwnerDisplay = () => {
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []); // Request wallet connection
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const ownerAddress = await contract.showOwner();
        setOwner(ownerAddress);
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };

    fetchOwner();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md">
      <h2 className="text-lg font-semibold">Contract Owner</h2>
      <p className="text-sm">{owner || "Fetching..."}</p>
    </div>
  );
};

export default OwnerDisplay;