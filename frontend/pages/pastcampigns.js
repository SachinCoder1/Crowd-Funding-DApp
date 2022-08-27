import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import MainLayout from "../layouts/MainLayout";
import Card1 from "../subcomponents/card/Card1";
import { ethers } from "ethers";

export default function Pastcampigns() {
  const { accountAddress, getCrowdFundingContract } = useContext(MainContext);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const Request = async () => {
      if (accountAddress) {
        try {
          setIsLoading(true);
          const contract = await getCrowdFundingContract();

          const getAllCampaigns = contract.filters.campaignCreated(
            null,
            accountAddress
          );
          const AllCampaigns = await contract.queryFilter(getAllCampaigns);
          const MyData = AllCampaigns.map((e) => {
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
          setMyCampaigns(MyData);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log("error....", error);
        }
      }
    };
    Request();
  }, [accountAddress]);

  return (
    <MainLayout>
      <div className="flex flex-wrap items-center gap-10">
        {accountAddress
          ? myCampaigns.length && !isLoading
            ? myCampaigns.map((item, index) => (
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
            : !myCampaigns.length && !isLoading
            ? "No Campaigns Found"
            : "Loading..."
          : "Connect Wallet to see your Campaigns."}
      </div>
    </MainLayout>
  );
}
