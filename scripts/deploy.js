async function main() {
    const Sapien = await ethers.getContractFactory("Sapien")
    const NAME = 'FOMO SAPIENS';
    const SYMBOL = 'SAPIEN';
    const _BASE_URL = 'https://ipfs/';
    // Start deployment, returning a promise that resolves to a contract object
    const sapien = await Sapien.deploy(NAME, SYMBOL, _BASE_URL);
    console.log("Contract deployed to address:", sapien.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  