async function main() {
    const Sapien = await ethers.getContractFactory("Sapien")
    const NAME = 'Fomo Sapiens';
    const SYMBOL = 'SAPIEN';
    const SUPPLY = 2000;
    // Start deployment, returning a promise that resolves to a contract object
    const sapien = await Sapien.deploy(NAME, SYMBOL, SUPPLY);
    console.log("Contract deployed to address:", sapien.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  