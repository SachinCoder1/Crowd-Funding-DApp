import React, { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ethers } from "ethers";
import { MdAddTask } from "react-icons/md";
import { useRouter } from "next/router";
import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
  IconButton,
} from "@material-tailwind/react";
// import Button from "../../subcomponents/btns/Button";
import { categories } from "../../data";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { contractAddress } from "../../constants";
import { abi } from "../../constants/CrowdFunding.json";

export default function CreateCampaign() {
  // const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const PROJECT_SECRET = process.env.NEXT_PUBLIC_PROJECT_SECRET;

  const auth =
    "Basic " +
    Buffer.from(PROJECT_ID + ":" + PROJECT_SECRET).toString("base64");

  const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const router = useRouter();
  const [isListing, setisListing] = useState(false);
  const [category, setCategory] = useState("")
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const onChangeFiles = async (e) => {
    const fileData = e.target.files[0];
    try {
      const add = await client.add(fileData, {
        progress: (prog) => console.log("Image is uploaded : ", prog),
      });
      // const url = `https://ipfs.infura.io/ipfs/${add.path}`;
      const url = `https://crowdfunding1.infura-ipfs.io/ipfs/${add.path}`;
      setFile(url);
    } catch (error) {
      console.log(
        "Error in onChange function , You are in catch of ListItem component ",
        error
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleClick = async () => {
    const { title, description, amount } = formData;
    if (!title || !amount || !description || !file || !category) {
      console.log("Some feild are missing");
      return;
    }

    const amountInWEI = ethers.utils.parseEther(amount)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const campaignData = await contract.createCampaign(title, file, description, category, amountInWEI);
    await campaignData.wait();

    if(campaignData.to){
      console.log("campaign started...", campaignData.to);
    }
    
  };

  return (
    <div className="flex justify-center py-5 px-5">
      <div className="md:w-4/6 space-y-6">
        <Input
          color="green"
          variant="standard"
          name="title"
          onChange={handleInputChange}
          label="Campaign Title"
        />
        <Textarea
          color="green"
          variant="outlined"
          onChange={handleInputChange}
          label="Description (max:300 characters)"
          name="description"
        />
        <Input
          color="green"
          variant="standard"
          size="lg"
          type="file"
          name="image"
          onChange={onChangeFiles}
          label="Select Image"
        />
        <div className="">
          {file && (
            <img
              className="rounded-xl mt-4 mb-10 w-96"
              src={file}
              alt="Choosen image"
            />
          )}
        </div>
        <div className="flex gap-x-4 w-full justify-center">
          <Input
            color="green"
            variant="standard"
            name="amount"
            onChange={handleInputChange}
            label="Required Amount"
          />
          <Select
            color="green"
            variant="standard"
            onChange={(e) => setCategory(e)}
            label="Category"
          >
            {categories?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          className="flex items-center justify-center gap-x-2 bg-primary"
          fullWidth
          onClick={handleClick}
        >
          <MdAddTask className="text-xl text-white" />
          Create Campaign
        </Button>
      </div>
    </div>
  );
}
