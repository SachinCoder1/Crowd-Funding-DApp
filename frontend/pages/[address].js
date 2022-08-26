import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import CampaignDetail from "../components/campaign-details/CampaignDetail";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineArrowRight } from "react-icons/ai";
import TransactionTab from "../components/campaign-details/TransactionTab";
import Transaction from "../components/campaign-details/Transaction";
import { contractAddress } from "../constants";
import ContractABI from '../constants/CrowdFunding.json'
import CampaignABI from '../constants/Campaign.json'
import { ethers } from "ethers";

const data = {
  image:
    "https://crowdfunding1.infura-ipfs.io/ipfs/QmZcVT7mD9S9S3qudGSy3AhFuEurx3tnDU7N7NMYQQJgyx",
  name: "Fund My Masters",
  description:
    "For the purpose to educate and train the special children Sadhana society started their Institute ‘Sadhana vocational training institute’ for the mentally handicapped in Chandigarh. The institute opened up new avenues for intellectually disabled under the expert guidance of educators, physiotherapist, speech therapist, yoga and dance teachers and the parents working voluntarily hard. Children are put to various schemes and programmes with the scientific approach apart from the basic academic.",
  price: "500",
  recievedAmount: "20",
  publishedDate: "02 Jan 2022",
};

const recentTxData = [
  {
    address: "0x00000000232328283739373927392",
    fundedAmount: "25",
    publishedDate: "02 March 2022",
  },
  {
    address: "0x00000000232328283739373927392",
    fundedAmount: "25",
    publishedDate: "02 March 2022",
  },
];



export default function Details({ Data, DonationsData }) {

  const tabData = [
    {
      label: "Recent Transactions",
      value: "recenttx",
      desc: DonationsData ? (
        <Transaction data={DonationsData} />
      ) : (
        "No Transactions Found"
      ),
    },
    {
      label: "My Transactions",
      value: "mytx",
      desc: DonationsData ? (
        <Transaction data={DonationsData} />
      ) : (
        "No Transactions Found"
      ),
    },
  ];

  
  console.log("Detail page data -> ", Data);
  console.log("Detail page DonationsData -> ", DonationsData);
  return (
    <MainLayout>
      <CampaignDetail data={Data}>
        <Button
          className="flex items-center justify-center text-base gap-x-2 bg-primary"
          fullWidth
        >
          Fund Now
          <AiOutlineArrowRight className="text-2xl" />
        </Button>
        <div className="my-5 py-5 px-3">
          <TransactionTab data={tabData} />
        </div>
      </CampaignDetail>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    contractAddress,
    ContractABI.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);

  return {
    paths: AllCampaigns.map((e) => ({
      params: {
        address: e.args._campaignAddress.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
    const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  
    const contract = new ethers.Contract(
      context.params.address,
      CampaignABI.abi,
      provider
    );
  

  const CampaignData = await contract.getCampaign();
  const Donations = contract.filters.campaignFunded();
  const AllDonations = await contract.queryFilter(Donations);

  const Data = {
    address: context.params.address,
    title : CampaignData.title,
    requiredAmount: ethers.utils.formatEther(CampaignData.requiredAmount),
    image: CampaignData.image,
    receivedAmount: ethers.utils.formatEther(CampaignData.recievedAmount),
    description: CampaignData.description,
    campaignOwner: CampaignData.campaignOwner,
  };

  const DonationsData = AllDonations.map((e) => {
    return {
        funder: e.args.funder,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp: parseInt(e.args.timestamp),
    };
  });

  return {
    props: {
      Data,
      DonationsData,
    },
  };
}
