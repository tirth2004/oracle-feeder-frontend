/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function Header() {
  const { openConnectModal } = useConnectModal(); // Get wallet modal function
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
        setProvider(new ethers.BrowserProvider((window as any).ethereum));
      }
  }, []);

  async function connectWallet() {
    if (!provider) {
      openConnectModal?.(); // Open wallet selection modal
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const balance = await provider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(balance).slice(0, 6));
    } catch (error) {
      console.error("Connection error", error);
    }
  }

  function disconnectWallet() {
    setAccount(null);
    setBalance(null);
  }

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white border-b border-gray-700">
      <h1 className="text-xl font-bold">SchizoChain</h1>
      <DropdownMenu open={isDropdownOpen && account} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-gray-900 text-white" onClick={!account ? connectWallet : undefined}>
            {account ? `${account.slice(0, 6)}...${account.slice(-4)} (${balance} ETH)` : "Connect Wallet"}
          </Button>
        </DropdownMenuTrigger>
        {account && (
          <DropdownMenuContent className="bg-gray-800 text-white">
            <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer hover:bg-gray-700">Disconnect</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </header>
  );
}