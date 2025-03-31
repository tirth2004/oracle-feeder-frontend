/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CONTRACT_ADDRESS = "0x5643008Ae3F208758Fd58b47e08057deAA67EbB1";

const Interact = () => {
    // const provider = new JsonRpcProvider("http://35.223.184.84:8547");
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isWhitelisted, setIsWhitelisted] = useState(false);
    const [feedValue, setFeedValue] = useState("");
    const [averageValue, setAverageValue] = useState("N/A");
    const [whitelistAddress, setWhitelistAddress] = useState("");

    const getSignerAndAddress = async () => {
        if (!window.ethereum) {
            alert("No Ethereum provider found");
            return null;
        }
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        return { signer, address };
    };

    const initializeContract = async () => {
        const signerData = await getSignerAndAddress();
        if (!signerData) return;
        const { signer } = signerData;
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, [
            "function owner() view returns (address)",
            "function isWhitelisted(address) view returns (bool)",
            "function whitelistProvider(address)",
            "function removeProvider(address)",
            "function submitData(uint256)",
            "function getAverageLastMinute() view returns (uint256)"
        ], signer);
        setContract(contractInstance);

        try {
            const owner = await contractInstance.owner();
            setIsOwner(owner.toLowerCase() === signerData.address.toLowerCase());
            const whitelisted = await contractInstance.isWhitelisted(signerData.address);
            setIsWhitelisted(whitelisted);
        } catch (error) {
            console.error("Error checking permissions:", error);
            alert("Failed to check permissions. Please try again.");
        }
    };

    useEffect(() => {
        initializeContract();
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", async () => {
                await initializeContract();
            });
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", initializeContract);
            }
        };
    }, []);

    const addToWhitelist = async () => {
        const signerData = await getSignerAndAddress();
        if (!signerData || !contract || !isOwner) {
            alert("You are not the owner!");
            return;
        }
        try {
            const tx = await contract.whitelistProvider(whitelistAddress);
            await tx.wait();
            alert("Address whitelisted!");
        } catch (error) {
            console.error("Error whitelisting address:", error);
            alert("Failed to whitelist address. Please try again.");
        }
    };

    const removeFromWhitelist = async () => {
        const signerData = await getSignerAndAddress();
        if (!signerData || !contract || !isOwner) {
            alert("You are not the owner!");
            return;
        }
        try {
            const tx = await contract.removeProvider(whitelistAddress);
            await tx.wait();
            alert("Address removed from whitelist!");
        } catch (error) {
            console.error("Error removing address:", error);
            alert("Failed to remove address from whitelist. Please try again.");
        }
    };

    const submitFeed = async () => {
        const signerData = await getSignerAndAddress();
        if (!signerData || !contract || !isWhitelisted) {
            alert("You are not whitelisted!");
            return;
        }
        try {
            const tx = await contract.submitData(parseInt(feedValue));
            await tx.wait();
            alert("Feed submitted!");
        } catch (error) {
            console.error("Error submitting feed:", error);
            alert("Failed to submit feed. Please try again.");
        }
    };

    const fetchAverageValue = async () => {
        if (!contract) return;
        try {
            const avg = await contract.getAverageLastMinute();
            setAverageValue(avg.toString());
        } catch (error) {
            console.error("Error fetching average value:", error);
            alert("Failed to fetch average value. Please try again.");
        }
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-lg font-bold">Interact with SchizoChain Oracle</h2>

            {isOwner && (
                <div className="flex justify-center items-center flex-col mt-4">
                    <h3 className="font-semibold m-5">Whitelist Management</h3>
                    <div className="flex flex-col w-[60%]">
                        <Input
                            type="text"
                            placeholder="Enter address"
                            className="w-full p-2 text-white bg-gray-800"
                            value={whitelistAddress}
                            onChange={(e) => setWhitelistAddress(e.target.value)}
                        />
                        <div className="flex justify-between mt-2">
                            <Button className="w-[49%] p-2 bg-green-500" onClick={addToWhitelist}>Add</Button>
                            <Button className="w-[49%] p-2 bg-red-500" onClick={removeFromWhitelist}>Remove</Button>
                        </div>
                    </div>
                </div>
            )}

            {isWhitelisted && (
                <div className="flex justify-center items-center flex-col mt-4">
                    <h3 className="font-semibold m-5">Submit Feed</h3>
                    <Input
                        type="number"
                        placeholder="Enter feed value"
                        className="w-[60%] p-2 text-white bg-gray-800"
                        value={feedValue}
                        onChange={(e) => setFeedValue(e.target.value)}
                    />
                    <Button className=" w-[30%] m-5 p-2 bg-blue-500 " onClick={submitFeed}>Submit</Button>
                </div>
            )}

            <div className="mt-4">
                <h3 className="font-semibold">Get Average Value</h3>
                <Button className="w-[30%] m-5 p-2 bg-yellow-500" onClick={fetchAverageValue}>Fetch</Button>
                <p className="mt-2">Average: {averageValue}</p>
            </div>
        </div>
    );
};

export default Interact;
