import { contractAddress } from "../constants";
import MainLayout from "../layouts/MainLayout";
import ContractABI from "../constants/CrowdFunding.json";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Card1 from "../subcomponents/card/Card1";
import { Select, Option } from "@material-tailwind/react";
import { categoriesMain } from "../data";

export default function Home({ AllData, HealthData, EducationData, ngoData }) {
  const [filteredData, setFilteredData] = useState(AllData);
  console.log(AllData);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState("all");

  useEffect(() => {
    switch (category) {
      case "education":
        setIsLoading(true);
        setFilteredData(EducationData);
        setIsLoading(false);
        break;
      case "health":
        setFilteredData(HealthData);
        break;
      case "ngo":
        setFilteredData(ngoData);
        break;
      default:
        setIsLoading(true);
        setFilteredData(AllData);
        setIsLoading(false);
        break;
    }
  }, [category]);

  return (
    <MainLayout
      metaTitle="Home"
      metaDescription="All Campaigns where you can see another person's campaigns, fund campaigns in decentralized manner. Truly Decentralized."
    >
      <div className="w-40 my-10 mx-auto space-y-2">
        <Select
          color="green"
          variant="standard"
          onChange={(e) => setCategory(e)}
          label="Category"
        >
          {categoriesMain?.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-10">
        {filteredData.length
          ? filteredData.map((item, index) => (
              <Card1
                key={index}
                imgSrc={item.image}
                title={item.title}
                description={item.description}
                address={item.owner}
                requiredAmt={item.amount}
                publishedDate={item.timeStamp}
                campaignAddress={item.address}
              />
            ))
          : !filteredData.length && !isLoading
          ? "No Campaigns Found"
          : "Loading..."}
      </div>
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
      description: e.args._description,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getHealthCampaigns = contract.filters.campaignCreated("health");
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args._title,
      description: e.args._description,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreated("education");
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args._title,
      description: e.args._description,
      image: e.args._image,
      owner: e.args._campaignOwner,
      timeStamp: parseInt(e.args._timestamp),
      amount: ethers.utils.formatEther(e.args._requiredAmount),
      address: e.args._campaignAddress,
    };
  });

  const getNGOCampaigns = contract.filters.campaignCreated("ngo");
  const NGOCampaign = await contract.queryFilter(getNGOCampaigns);
  const ngoData = NGOCampaign.map((e) => {
    return {
      title: e.args._title,
      description: e.args._description,
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
