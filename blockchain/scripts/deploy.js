const hre = require('hardhat');

async function main() {

    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding")
    const crowdfunding = await CrowdFunding.deploy();

    await crowdfunding.deployed();

    console.log("contract deployed to:", crowdfunding.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });