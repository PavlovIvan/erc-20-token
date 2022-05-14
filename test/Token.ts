import { ethers } from "hardhat";
import { Signer, BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe("My TokenImpl contract", function () {

    let hardhatToken: Contract;
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];

    beforeEach(async function () {
        let Token = await ethers.getContractFactory("Token");
        [owner, ...signers] = await ethers.getSigners();

        hardhatToken = await Token.deploy();

        await hardhatToken.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
    });

    describe("Test getters", function () {
        it("Should be able to get name", async function () {
            expect(await hardhatToken.name()).to.equal("ZashheCoin");
        });

        it("Should be able to get symbol", async function () {
            expect(await hardhatToken.symbol()).to.equal("#");
        });

        it("Should be able to get decimals", async function () {
            expect(await hardhatToken.decimals()).to.equal(18);
        });
    });

    describe("Test mint", function () {
        it("Should change balance and totalSupply after mint ", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(5);
            expect(await hardhatToken.totalSupply()).to.equal(5);
        });

        it("Should fail if sender is not owner", async function () {
            await expect(
                hardhatToken.connect(signers[0]).mint(signers[0].address, 5)
            ).to.be.revertedWith("Access denied");
        });
    });


    describe("Test burn", function () {
        it("Should change balance and totalSupply after burn ", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            await hardhatToken.connect(owner).burn(signers[0].address, 4);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(1);
            expect(await hardhatToken.totalSupply()).to.equal(1);
        });

        it("Should fail if sender is not owner", async function () {
            await expect(
                hardhatToken.connect(signers[0]).burn(signers[0].address, 5)
            ).to.be.revertedWith("Access denied");
        });
    });

    describe("Test transfer", function () {
        it("Should change balance after transfer", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(0);
            
            await hardhatToken.connect(signers[0]).transfer(signers[1].address, 2);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(3);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(2);
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            await expect(
                hardhatToken.connect(signers[0]).transfer(signers[1].address, 10)
            ).to.be.revertedWith("Account doesn't have enough tokens");
        });
    });

    describe("Test approve", function () {
        it("Should change allowance after approve", async function () {
            await hardhatToken.connect(signers[0]).approve(signers[1].address, 5);
            expect(await hardhatToken.allowance(signers[0].address, signers[1].address)).to.equal(5);
        });
    });

    describe("Test transferFrom", function () {
        it("Should change balance and allowance after transferFrom", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            await hardhatToken.connect(signers[0]).approve(signers[1].address, 5);

            expect(await hardhatToken.allowance(signers[0].address, signers[1].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[2].address)).to.equal(0);

            await hardhatToken.connect(signers[1]).transferFrom(signers[0].address, signers[2].address, 5);

            expect(await hardhatToken.allowance(signers[0].address, signers[1].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[2].address)).to.equal(5);
        });

        it("Should fail if sender doesn't have enough tokens allowance", async function () {
            await hardhatToken.connect(owner).mint(signers[0].address, 5);
            await hardhatToken.connect(signers[0]).approve(signers[1].address, 5);

            expect(await hardhatToken.allowance(signers[0].address, signers[1].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[2].address)).to.equal(0);

            await expect(
                hardhatToken.connect(signers[1]).transferFrom(signers[0].address, signers[2].address, 10)
            ).to.be.revertedWith("Account don't have enough allowance");

            expect(await hardhatToken.allowance(signers[0].address, signers[1].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[0].address)).to.equal(5);
            expect(await hardhatToken.balanceOf(signers[1].address)).to.equal(0);
            expect(await hardhatToken.balanceOf(signers[2].address)).to.equal(0);
        });
    });
});