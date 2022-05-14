import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);

    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    console.log("Token deployed to: ", hardhatToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
