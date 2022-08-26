import { Typography } from "@material-tailwind/react";
import React from "react";
import { MdDateRange } from "react-icons/md";
import { FaRegAddressBook, FaEthereum } from "react-icons/fa";
import { timeConverter } from "../../utils/DateConverter";

export default function Transaction({ data }) {
  console.log("You are in transaction component");
  return (
    <div className="bg-gray-300 px-3 ">
      {data?.map((item, index) => (
        <div
          className="flex justify-between items-center py-2 gap-y-4 border-b border-gray-100"
          key={index}
        >
          <Typography
            variant="small"
            color="gray"
            className="flex gap-1 items-center"
          >
            <FaRegAddressBook />
            {item.funder.slice(0, 6)}...
            {item.funder.slice(item.funder.length - 4)}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="flex gap-1 items-center"
          >
            <FaEthereum className="text-[#3c3c3d]" />
            {item.amount} Ether
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="flex gap-1 items-center"
          >
            <MdDateRange />
            {timeConverter(item.timestamp)}
          </Typography>
        </div>
      ))}
    </div>
  );
}
