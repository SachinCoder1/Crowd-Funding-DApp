import { Button } from "@material-tailwind/react";
import React from "react";
import CampaignDetail from "../components/campaign-details/CampaignDetail";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineArrowRight } from "react-icons/ai";
import TransactionTab from "../components/campaign-details/TransactionTab";
import Transaction from "../components/campaign-details/Transaction";

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
        publishedDate: "02 March 2022"
    },
    {
        address: "0x00000000232328283739373927392",
        fundedAmount: "25",
        publishedDate: "02 March 2022"
    },
]

const tabData = [
    {
      label: "Recent Transactions",
      value: "recenttx",
      desc: recentTxData ? <Transaction data={recentTxData} /> : "No Transactions Found"
    },
    {
      label: "My Transactions",
      value: "mytx",
      desc: !recentTxData ? <Transaction data={recentTxData} /> : "No Transactions Found"
    }
  ];

export default function Details() {
  return (
    <MainLayout>
      <CampaignDetail data={data}>
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
