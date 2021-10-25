const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BN, constants, time } = require('@openzeppelin/test-helpers');
const utils = require("./helpers/utils");
const hre = require("hardhat");

let HTRAXToken;
let htraxToken;
let owner;
let user_burner;
let user_minter;
let user_contract_manager;
let user_risk_manager;
let user_executor_role;
let addr1;
let addr2;
let addrs;
let BURNER_ROLE;
let MINTER_ROLE;
let CONTRACT_MANAGER_ROLE;
let RISK_MANAGER_ROLE;
let EXECUTOR_ROLE;
let timeNow;

beforeEach(async () => {
  HTRAXToken = await ethers.getContractFactory("HTRAXToken");
  htraxToken = await HTRAXToken.deploy();
  await htraxToken.deployed();
  [owner, user_burner, user_minter, user_contract_manager, user_risk_manager, user_executor_role, addr1, addr2, ...addrs] = await ethers.getSigners();

  BURNER_ROLE = await htraxToken.BURNER_ROLE();
  MINTER_ROLE = await htraxToken.MINTER_ROLE();
  CONTRACT_MANAGER_ROLE = await htraxToken.PRESALES_MANAGER_ROLE();
  RISK_MANAGER_ROLE = await htraxToken.RISK_MANAGER_ROLE();
  EXECUTOR_ROLE = await htraxToken.EXECUTOR_ROLE();
  timeNow = time.latest();
});

/*describe("Contract Optimization", function () {
  it("Check Storage Layout", async function() { 
    await hre.storageLayout.export();
  });
});*/

describe("Deployment should assign the total supply of tokens to the owner", function () {
  it("Check total cap of the contract to 375 million", async function() {   
    const cap = await htraxToken.cap();
    expect(cap.toString()).to.equal('375000000000000000000000000');
  });  
  it("Check minted supply of the contract 93.75 million", async function() {   
    const totalSupply = await htraxToken.totalSupply();
    expect(totalSupply.toString()).to.equal('93750000000000000000000000');
  });  
  it("Owners balance should be same as pre-minted tokens", async function() {  
    const ownerBalance = await htraxToken.balanceOf(owner.address);
    expect(ownerBalance.toString()).to.equal('93750000000000000000000000');
  });    
});

describe("Token burn function", function () {
  it("Check if BURNER_ROLE is assigned to the user_burner", async function() {   
    expect(await htraxToken.hasRole(BURNER_ROLE, user_burner.address)).to.equal(false);
  });
  it("Grant BURNER_ROLE to user_burner and verify", async function() {   
    await htraxToken.grantRole(BURNER_ROLE, user_burner.address);
    expect(await htraxToken.hasRole(BURNER_ROLE, user_burner.address)).to.equal(true);
  });   
  it("Transfer 100 HTRAX tokens to user_burner", async function() {
    await htraxToken.transfer(user_burner.address, '100000000000000000000');
    const user_burner_balance = await htraxToken.balanceOf(user_burner.address);    
    expect(user_burner_balance.toString()).to.equal('100000000000000000000');
  });
  it("Burn 50 HTRAX tokens by user_burner", async function() {
    await htraxToken.grantRole(BURNER_ROLE, user_burner.address);
    await htraxToken.transfer(user_burner.address, '100000000000000000000');

    await htraxToken.connect(user_burner).burn('50000000000000000000');
    const user_burner_balance = await htraxToken.balanceOf(
      user_burner.address
    );    
    expect(user_burner_balance.toString()).to.equal('50000000000000000000');
    
    const totalSupply = await htraxToken.totalSupply();
    expect(totalSupply.toString()).to.equal('93749950000000000000000000');
  });
});

describe("Token mint function", function () { 
  beforeEach(async function () {    
    await htraxToken.grantRole(MINTER_ROLE, user_minter.address);
    await htraxToken.grantRole(BURNER_ROLE, user_minter.address);    
  });
  it("Mint HTRAX tokens for each release by user_minter", async function() {
    const cap = await htraxToken.cap();
        
    // release 1    
    const totalSupplyRelease1 = await htraxToken.totalSupply();
    expect(totalSupplyRelease1.toString()).to.equal('93750000000000000000000000');

    // release 2
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    const totalSupplyRelease2 = await htraxToken.totalSupply();
    expect(totalSupplyRelease2.toString()).to.equal('187500000000000000000000000');

    // release 3
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    const totalSupplyRelease3 = await htraxToken.totalSupply();
    expect(totalSupplyRelease3.toString()).to.equal('281250000000000000000000000');
    
    // release 4
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    const totalSupplyRelease4 = await htraxToken.totalSupply();
    expect(totalSupplyRelease4.toString()).to.equal(cap.toString());
  });
  it("Minter try to mint more tokens then allowed --> It must give an error", async function() { 
    const cap = await htraxToken.cap();

    // mint all tokens
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    await htraxToken.connect(user_minter).mint(user_minter.address, '93750000000000000000000000');
    const totalSupplyReleaseAll = await htraxToken.totalSupply();
    expect(totalSupplyReleaseAll.toString()).to.equal(cap.toString());
    
    // mint additional 100 HTRAX tokens
    //await utils.shouldThrow(await htraxToken.connect(user_minter).mint(user_minter.address, '100000000000000000000'));
    
    // burn tokens
    await htraxToken.connect(user_minter).burn('100000000000000000000');
    const totalSupplyAfterBurned100 = await htraxToken.totalSupply();
    expect(totalSupplyAfterBurned100.toString()).to.equal('374999900000000000000000000');

    const totalBurned = await htraxToken.totalBurned();
    expect(totalBurned.toString()).to.equal('100000000000000000000');

    // mint burned tokens
    //await utils.shouldThrow(await htraxToken.connect(user_minter).mint(user_minter.address, '100000000000000000000'));
  });
});

describe("Token pause function", function () { 
  beforeEach(async function () {
    await htraxToken.grantRole(RISK_MANAGER_ROLE, user_risk_manager.address);
    expect(await htraxToken.hasRole(RISK_MANAGER_ROLE, user_risk_manager.address)).to.equal(true);
    await htraxToken.connect(user_risk_manager).pause();
    expect(await htraxToken.connect(user_risk_manager).paused()).to.be.true;   
  });   
  it("Check transfering tokens when tokens are pausable", async function() {
    await utils.shouldThrow(htraxToken.transfer(addr1.address, 100));
  }); 
  
  it("Check transfering tokens when tokens are pausable and then not pausable", async function() {
    await utils.shouldThrow(htraxToken.transfer(addr1.address, 100));
    let addr1_balance = await htraxToken.balanceOf(addr1.address);      
    expect(addr1_balance.toString()).to.equal('0');   

    await htraxToken.connect(user_risk_manager).unpause();
    expect(await htraxToken.connect(user_risk_manager).paused()).to.be.false;
    await utils.shouldThrow(htraxToken.transfer(addr1.address, 100));
    addr1_balance = await htraxToken.balanceOf(addr1.address);    
    expect(addr1_balance.toString()).to.equal('100');    
  });   
});