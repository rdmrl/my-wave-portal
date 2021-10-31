// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [owner, randomPerson] = await hre.ethers.getSigners();

  // We get the contract to deploy
  const WavePortalFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await WavePortalFactory.deploy();

  await waveContract.deployed();

  console.log("WavePortalFactory contract deployed to: ", waveContract.address);
  console.log("WavePortalFactory contract deployed by: ", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  
  const waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();