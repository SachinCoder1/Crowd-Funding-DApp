import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import { contractAddress } from "../constants";
import MainLayout from "../layouts/MainLayout";
import ContractABI from "../constants/CrowdFunding.json";
import { ethers } from "ethers";
import React, { useEffect } from "react";

export default function Home({AllData, HealthData, EducationData, ngoData}) {
  console.log("All Data -> ", AllData);
  console.log("health Data -> ", HealthData);
  console.log("eduaction Data -> ", EducationData);
  console.log("NGO Data -> ", ngoData);

 
  
  return (
    <MainLayout
      metaTitle="Home"
      metaDescription="All Campaigns where you can see another person's campaigns, fund campaigns in decentralized manner. Truly Decentralized."
    >
      Hello
    </MainLayout>
  );
}

export async function getStaticProps() {
  const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);


  const contract = new ethers.Contract(
    contractAddress,
    ContractABI.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args._title,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getHealthCampaigns = contract.filters.campaignCreated(
    null,
    null,
    "health",
    null,
    null,
    null,
    null
  );
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args._title,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreated(
    null,
    null,
    "education",
    null,
    null,
    null,
    null
  );
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args._title,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getNGOCampaigns = contract.filters.campaignCreated(
    null,
    null,
    "ngo",
    null,
    null,
    null,
    null
  );
  const NGOCampaign = await contract.queryFilter(getNGOCampaigns);
  const ngoData = NGOCampaign.map((e) => {
    return {
      title: e.args._title,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      ngoData,
    },
  };
}
