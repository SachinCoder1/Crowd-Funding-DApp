import React, { useState } from "react";
import { ethers } from "ethers";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../subcomponents/btns/Button";

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    try {
      setLoading(true)
      await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
    }
    const account = provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);
    const Balance = ethers.utils.formatEther(await account.getBalance());
    setBalance(Balance);

    setLoading(false)
      
    } catch (error) {
      setLoading(false)
      console.log("Error while connected wallet ", error)
      
    }
  };

  return (
    <div>
      {address.length > 2 ? (
        <div className="bg-slate-200 py-2.5 rounded-2xl pl-4 cursor-pointer">
          <span className="text-black">
            {address.slice(0, 6)}...{address.slice(address.length - 4)}
          </span>
          <span className="bg-green-500 py-2.5 ml-4 px-3 rounded-2xl text-white">
            {balance.slice(0, 4)} ETH
          </span>
        </div>
      ) : (
        <Button
          text="Connect Wallet"
          icon={<AiOutlinePlus className="text-2xl" />}
          className=""
          onClick={() => connectWallet()}
          disabled={loading}
          isLoading={loading}
          fullWidth={false}
        />
      )}
    </div>
  );
}
