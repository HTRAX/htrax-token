const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BN, time } = require('@openzeppelin/test-helpers');
const utils = require("./helpers/utils");

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

beforeEach(async () => {
  HTRAXToken = await ethers.getContractFactory("HTRAXToken");
  htraxToken = await HTRAXToken.deploy();
  await htraxToken.deployed();
  [owner, user_burner, user_minter, user_contract_manager, user_risk_manager, user_executor_role, addr1, addr2, ...addrs] = await ethers.getSigners();

  BURNER_ROLE = await htraxToken.BURNER_ROLE();
  MINTER_ROLE = await htraxToken.MINTER_ROLE();
  CONTRACT_MANAGER_ROLE = await htraxToken.CONTRACT_MANAGER_ROLE();
  RISK_MANAGER_ROLE = await htraxToken.RISK_MANAGER_ROLE();
  EXECUTOR_ROLE = await htraxToken.EXECUTOR_ROLE();
});

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
    await htraxToken.transfer(user_burner.address, 100);
    const user_burner_balance = await htraxToken.balanceOf(user_burner.address);    
    expect(user_burner_balance.toString()).to.equal('100');
  });
  it("Burn 50 HTRAX tokens by user_burner", async function() {
    await htraxToken.grantRole(BURNER_ROLE, user_burner.address);
    await htraxToken.transfer(user_burner.address, 100);

    await htraxToken.connect(user_burner).burn(50);
    const user_burner_balance = await htraxToken.balanceOf(
      user_burner.address
    );    
    expect(user_burner_balance.toString()).to.equal('50');
    
    const totalSupply = await htraxToken.totalSupply();
    expect(totalSupply.toString()).to.equal('93749999999999999999999950');
  });
  
  it("Mint 50 HTRAX tokens by user_minter", async function() {
    await htraxToken.grantRole(MINTER_ROLE, user_minter.address);
    await htraxToken.mint(user_minter.address, 50);

    const totalSupply = await htraxToken.totalSupply();
    expect(totalSupply.toString()).to.equal('93750000000000000000000050');
  });
});

describe("Token pause function", function () {  
  it("Check transfering tokens when tokens are pausable", async function() {
    await htraxToken.grantRole(RISK_MANAGER_ROLE, user_risk_manager.address);
    expect(await htraxToken.hasRole(RISK_MANAGER_ROLE, user_risk_manager.address)).to.equal(true);
    await htraxToken.connect(user_risk_manager).pause();
    expect(await htraxToken.connect(user_risk_manager).paused()).to.be.true;

    await utils.shouldThrow(htraxToken.transfer(addr1.address, 100));
  }); 
  
  it("Check transfering tokens when tokens are pausable and then not pausable", async function() {
    await htraxToken.grantRole(RISK_MANAGER_ROLE, user_risk_manager.address);
    expect(await htraxToken.hasRole(RISK_MANAGER_ROLE, user_risk_manager.address)).to.equal(true);
    await htraxToken.connect(user_risk_manager).pause();
    expect(await htraxToken.connect(user_risk_manager).paused()).to.be.true;
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

describe("Token timelock function", function () {  
  it("Send timelocked token to addr1", async function() {
    await htraxToken.transfer(user_executor_role.address, 10000);

    await htraxToken.grantRole(EXECUTOR_ROLE, user_executor_role.address);
    await htraxToken.connect(user_executor_role).transferLockedTokens(addr1.address, 10000, 10000, 1632596400, 3600, 1000);
    const addr1_balance = await htraxToken.balanceOf(addr1.address);    
    expect(addr1_balance.toString()).to.equal('10000');

    let resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('10000');
  });

  it("Release timelocked token from addr1", async function() {
    await htraxToken.transfer(user_executor_role.address, 10000);

    await htraxToken.grantRole(EXECUTOR_ROLE, user_executor_role.address);
    await htraxToken.connect(user_executor_role).transferLockedTokens(addr1.address, 10000, 10000, 1632596400, 3600, 1000);
    const addr1_balance = await htraxToken.balanceOf(addr1.address);    
    expect(addr1_balance.toString()).to.equal('10000');

    let resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('10000');
        
    await time.increase(3600);
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('9000');

    await time.increase(3600);
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('8000');

    await time.increase(3600);
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('7000');
  });
});
