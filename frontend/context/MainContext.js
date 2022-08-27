import { ethers } from "ethers";
import { createContext, useState } from "react";
import { contractAddress } from "../constants";
import ContractABI from "../constants/CrowdFunding.json";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState("");

  const getCrowdFundingContract = async () => {
    if (accountAddress) {
      let contract;
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_POLYGON_RPC_URL
      );

      contract = new ethers.Contract(
        contractAddress,
        ContractABI.abi,
        provider
      );

      return contract;
    } else {
      return null;
    }
  };

  return (
    <MainContext.Provider
      value={{
        accountAddress,
        setAccountAddress,
        getCrowdFundingContract,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
