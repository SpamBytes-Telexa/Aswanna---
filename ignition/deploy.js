const hre = require("hardhat");

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 4) {
    throw new Error("Usage: node deploy.js <buyer> <farmer> <quantity> <pricePerUnitInEther>");
  }
  
  const [buyer, farmer, quantityStr, priceStr] = args;
  const quantity = parseInt(quantityStr);
  const pricePerUnitInEther = priceStr;

  const totalPrice = hre.ethers.parseEther((quantity * parseFloat(pricePerUnitInEther)).toString());

  const OfferContract = await hre.ethers.getContractFactory("OfferContract");
  const contract = await OfferContract.deploy(
    buyer,
    farmer,
    quantity,
    hre.ethers.parseEther(pricePerUnitInEther),
    { value: totalPrice }
  );

  await contract.deployed();

  console.log("✅ Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
