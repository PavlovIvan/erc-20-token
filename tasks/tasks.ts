import { task } from "hardhat/config";

const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

task("transfer", "Transfer amount of tokens to address")
    .addParam("address", "Address receiver")
    .addParam("amount", "Amount of tokens for transfering")
    .setAction(async (taskArgs, hre) => {
        const token = await hre.ethers.getContractAt("Token", contractAddress);
        console.log(await token.transfer(taskArgs.address, taskArgs.amount));
    });

task("transferFrom", "Transfers tokens from account")
    .addParam("from", "Address of spender")
    .addParam("to", "Address of spender")
    .addParam("amount", "Amount of tokens for transfering")
    .setAction(async (taskArgs, hre) => {
        const token = await hre.ethers.getContractAt("Token", contractAddress);
        console.log(await token.transferFrom(taskArgs.from, taskArgs.to, taskArgs.amount));
    });

task("approve", "Approve spend of tokens")
    .addParam("address", "Address of spender")
    .addParam("amount", "Amount of tokens")
    .setAction(async (taskArgs, hre) => {
        const token = await hre.ethers.getContractAt("Token", contractAddress);
        console.log(await token.approve(taskArgs.address, taskArgs.amount));
    });