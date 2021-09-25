async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const HTRAXToken = await ethers.getContractFactory("HTRAXToken");
    const _htraxToken = await HTRAXToken.deploy();
  
    console.log("Token address:", _htraxToken.address);
    
    const ownerBalance = (await _htraxToken.balanceOf(deployer.address)).toString();
    console.log("Token Balance:", ownerBalance);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });