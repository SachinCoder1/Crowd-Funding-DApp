import { Button, Input } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import CampaignDetail from "../components/campaign-details/CampaignDetail";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineArrowRight } from "react-icons/ai";
import TransactionTab from "../components/campaign-details/TransactionTab";
import Transaction from "../components/campaign-details/Transaction";
import { contractAddress } from "../constants";
import ContractABI from "../constants/CrowdFunding.json";
import CampaignABI from "../constants/Campaign.json";
import { ethers } from "ethers";
import { MainContext } from "../context/MainContext";

export default function Details({ Data, DonationsData }) {
  const { accountAddress } = useContext(MainContext);
  const [isUserFunding, setIsUserFunding] = useState(false);
  const [myTransactions, setMyTransactions] = useState([]);
  const [fundInput, setFundInput] = useState("");
  const [isUpdated, setIsUpdated] = useState("notChanged");
  const tabData = [
    {
      label: "Recent Transactions",
      value: "recenttx",
      desc: DonationsData.length ? (
        <Transaction data={DonationsData} />
      ) : (
        "No Transactions Found"
      ),
    },
    {
      label: "My Transactions",
      value: "mytx",
      desc: accountAddress ? (
        myTransactions.length ? (
          <Transaction data={myTransactions} />
        ) : (
          "No Transactions Found"
        )
      ) : (
        "You are Not Logged In!"
      ),
    },
  ];

  const transferFund = async () => {
    if(fundInput <= 0)return;
    console.log("Clicked ", fundInput)
    try {
      console.log("you are inside try")
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(Data.address, CampaignABI.abi, signer);

      const transaction = await contract.fundCampaign({
        value: ethers.utils.parseEther(fundInput),
      });
      await transaction.wait();

      setIsUpdated(isUpdated == 'changed' ? 'notChanged' : "changed");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const Request = async () => {
      if (accountAddress) {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_POLYGON_RPC_URL
        );

        const contract = new ethers.Contract(
          Data.address,
          CampaignABI.abi,
          provider
        );
        const MyDonations = contract.filters.campaignFunded(accountAddress);
        const MyAllDonations = await contract.queryFilter(MyDonations);

        setMyTransactions(
          MyAllDonations.map((e) => {
            return {
              funder: e.args.funder,
              amount: ethers.utils.formatEther(e.args.amount),
              timestamp: parseInt(e.args.timestamp),
            };
          })
        );
      }
    };
    Request();
  }, [isUpdated, accountAddress]);

  console.log("Detail page data -> ", Data);
  console.log("Detail page DonationsData -> ", DonationsData);
  return (
    <MainLayout>
      <CampaignDetail data={Data}>
        {isUserFunding && (
          <>
          <div className="my-5 space-y-5 w-36">
            <Input
              color="green"
              variant="standard"
              name="amount"
              onChange={(e) =>{ setFundInput(e.target.value)  }}
              label="Enter Amount"
            />
          </div>
            <Button
              onClick={() => transferFund()}
              className="flex items-center justify-center text-base gap-x-2 bg-primary"
              fullWidth
              disabled={!fundInput.length && fundInput <= 0}
            >
              Fund Now
              <AiOutlineArrowRight className="text-2xl" />
            </Button>
            </>
        )}

        {isUserFunding ? (
          <Button
            onClick={() => setIsUserFunding(false)}
            className="bg-red-500 mt-12"
          >
            Cancel
            {/* <AiOutlineArrowRight className="text-2xl" /> */}
          </Button>
        ) : (
          <Button
            onClick={() => setIsUserFunding(true)}
            className="flex items-center justify-center text-base gap-x-2 bg-primary"
            fullWidth
          >
            Fund Now
            <AiOutlineArrowRight className="text-2xl" />
          </Button>
        )}

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
    title: CampaignData.title,
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
