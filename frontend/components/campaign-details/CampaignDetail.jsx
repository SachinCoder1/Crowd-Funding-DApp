import { Typography, Progress } from "@material-tailwind/react";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export default function CampaignDetail({ data, children }) {
  console.log((data.recievedAmount / data.price) * 100);
  return (
    <>
      {!data ? (
        "loading..."
      ) : (
        <div className="mt-6 p-2 bg-white shadow-lg">
          <div className="grid grid-cols-2">
            <div className="">
              <img className=" py-5 mx-auto" src={data?.image} />
              <div className="flex items-center justify-start gap-x-8">
                <Typography
                  variant="small"
                  color="gray"
                  className="flex gap-1 items-center"
                >
                  <MdDateRange />
                  {data.publishedDate}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="flex gap-1 items-center"
                >
                  <MdDateRange />
                  {data.publishedDate}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col justify-between p-7">
              <p>Recieved Amount ({data.recievedAmount} ETH)</p>
              <Progress
                className="h-6 text-white"
                value={(data.recievedAmount / data.price) * 100}
                label
              />
              <div className="space-y-3 my-5">
                <p className="text-6xl font-bold text-blue-500">{data?.name}</p>
                <p className="text-gray-600">{data?.description}</p>
                <p className="font-bold text-4xl text-green-500 flex items-center gap-x-1.5">
                  <span className="text-gray-600 text-base">
                    Required Fund : 
                  </span>
                  <FaEthereum className="text-[#3c3c3d]" /> {data?.price} Ether
                </p>
              </div>

              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
