import { Typography, Progress } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";

export default function CampaignDetail({ data, children }) {
  const [showFullAddress, setShowFullAddress] = useState(false);
  return (
    <>
      {!data ? (
        "loading..."
      ) : (
        <div className="mt-6 p-2 bg-white shadow-lg">
          <div className="grid grid-cols-2">
            <div className="">
              <img className=" py-5 mx-auto" src={data?.image} />
              <div className="flex items-center justify-center gap-x-8">
                <Typography
                  variant="small"
                  color="gray"
                  className="flex gap-1 items-center"
                >
                  {showFullAddress
                    ? data.address
                    : data.address.slice(0, 6) +
                      "..." +
                      data.address.slice(data.address.length - 4)}
                  <BiShowAlt
                    className="cursor-pointer hover:scale-110 transition-all"
                    onClick={() => setShowFullAddress(!showFullAddress)}
                  />
                </Typography>
              </div>
            </div>
            <div className="flex flex-col justify-between p-7">
              <p>Recieved Amount ({data.receivedAmount} ETH)</p>
              <Progress
                className="h-6 text-white"
                value={(data.receivedAmount / data.requiredAmount) * 100}
                label
              />
              <div className="space-y-3 my-5">
                <p className="text-6xl font-bold text-blue-500">
                  {data?.title}
                </p>
                <p className="text-gray-600">{data?.description}</p>
                <p className="font-bold text-4xl text-green-500 flex items-center gap-x-1.5">
                  <span className="text-gray-600 text-base">
                    Required Fund :
                  </span>
                  <FaEthereum className="text-[#3c3c3d]" />{" "}
                  {data?.requiredAmount} Ether
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
