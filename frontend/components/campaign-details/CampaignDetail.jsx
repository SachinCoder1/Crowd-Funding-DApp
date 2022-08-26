import React from "react";

export default function CampaignDetail({data}) {
  return (
    <>
      {!data ? (
        "loading..."
      ) : (
        <div className="grid grid-cols-2 mt-6 p-2 bg-white shadow-lg">
          <div className="">
            <img className=" py-5 mx-auto" src={data?.image} />
          </div>
          <div className="flex flex-col justify-between p-7">
            <div className="space-y-3 my-5">
              <p className="text-6xl font-bold text-blue-500">
                {data?.name}
              </p>
              <p className="text-gray-600">{data?.description}</p>
              <p className="font-bold text-4xl text-green-500">
                {data?.price.toString()} Ether
              </p>
            </div>

            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
