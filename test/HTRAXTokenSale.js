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
let PRESALES_MANAGER_ROLE;
let RISK_MANAGER_ROLE;
let EXECUTOR_ROLE;
let timeNow;

beforeEach(async () => {
  HTRAXToken = await ethers.getContractFactory("HTRAXToken");
  htraxToken = await HTRAXToken.deploy();
  await htraxToken.deployed();
  [owner, user_burner, user_minter, user_presales_manager, user_risk_manager, user_executor_role, addr1, addr2, ...addrs] = await ethers.getSigners();

  BURNER_ROLE = await htraxToken.BURNER_ROLE();
  MINTER_ROLE = await htraxToken.MINTER_ROLE();
  PRESALES_MANAGER_ROLE = await htraxToken.PRESALES_MANAGER_ROLE();
  RISK_MANAGER_ROLE = await htraxToken.RISK_MANAGER_ROLE();
  EXECUTOR_ROLE = await htraxToken.EXECUTOR_ROLE();
  timeNow = time.latest();
});

/*describe("Contract Optimization", function () {
  it("Check Storage Layout", async function() { 
    await hre.storageLayout.export();
  });
});*/

describe("Set Pre Sale Date Details", function () {
  it("Set presales start date", async function() {   
    let saleStartDate = await htraxToken.getSaleStartDate();
    expect(saleStartDate.toString()).to.equal('0');
    
    await utils.shouldThrow(htraxToken.connect(user_presales_manager).setSaleStartDate(1635721200));

    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    await htraxToken.connect(user_presales_manager).setSaleStartDate(1635721200);
    saleStartDate = await htraxToken.getSaleStartDate();
    expect(saleStartDate.toString()).to.equal('1635721200');

  });  
  it("Set presales end date", async function() {   
    let saleEndDate = await htraxToken.getSaleEndDate();
    expect(saleEndDate.toString()).to.equal('0');

    await utils.shouldThrow(htraxToken.connect(user_presales_manager).setSaleEndDate(1640905200));

    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    await htraxToken.connect(user_presales_manager).setSaleEndDate(1640905200);
    saleEndDate = await htraxToken.getSaleEndDate();
    expect(saleEndDate.toString()).to.equal('1640905200');    
  });    
});

describe("Set Pre Sale Level Details", function () {   
  it("Set presales level 1", async function() {   
    const level1ValueBefore = await htraxToken.getLevel1Value();
    expect(level1ValueBefore.toString()).to.equal('0');
    
    await utils.shouldThrow(htraxToken.connect(user_presales_manager).setLevel1Value('69444444444444444444444'));

    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    await htraxToken.connect(user_presales_manager).setLevel1Value('69444444444444444444444');
    const level1ValueAfter = await htraxToken.getLevel1Value();
    expect(level1ValueAfter.toString()).to.equal('69444444444444444444444');
  });
  it("Set presales level 2", async function() {   
    const level2ValueBefore = await htraxToken.getLevel2Value();
    expect(level2ValueBefore.toString()).to.equal('0');
    
    await utils.shouldThrow(htraxToken.connect(user_presales_manager).setLevel2Value('277777777777777777777777'));

    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    await htraxToken.connect(user_presales_manager).setLevel2Value('277777777777777777777777');
    const level2ValueAfter = await htraxToken.getLevel2Value();
    expect(level2ValueAfter.toString()).to.equal('277777777777777777777777');
  });
  it("Set presales level 3", async function() {   
    const level3ValueBefore = await htraxToken.getLevel2Value();
    expect(level3ValueBefore.toString()).to.equal('0');
    
    await utils.shouldThrow(htraxToken.connect(user_presales_manager).setLevel3Value('2777777777777777777777777'));

    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    await htraxToken.connect(user_presales_manager).setLevel3Value('2777777777777777777777777');
    const level3ValueAfter = await htraxToken.getLevel3Value();
    expect(level3ValueAfter.toString()).to.equal('2777777777777777777777777');
  });    
});

describe("Check Token Disount Function", function () {  
  it("Check presale token discount", async function() {   
    await htraxToken.grantRole(PRESALES_MANAGER_ROLE, user_presales_manager.address);
    expect(await htraxToken.hasRole(PRESALES_MANAGER_ROLE, user_presales_manager.address)).to.equal(true);

    //await time.set
    const timeNow = await time.latest();
    console.log('Time Now: %d', timeNow.toString()); 
    // Pre sales presales date
    await htraxToken.connect(user_presales_manager).setSaleStartDate(timeNow.toString());
    await htraxToken.connect(user_presales_manager).setSaleEndDate(1640905200);   

    // Set Levels
    await htraxToken.connect(user_presales_manager).setLevel1Value('69444444444444444444444');
    await htraxToken.connect(user_presales_manager).setLevel2Value('277777777777777777777777');
    await htraxToken.connect(user_presales_manager).setLevel3Value('2777777777777777777777777');

    // Get token discount between level 1 and level 2
    const level1TokenDiscount = await htraxToken.connect(user_presales_manager).getDiscountDetails('69444444444444444444444');
    expect(level1TokenDiscount.toString()).to.equal('76388888888888888888888');

    // Get token discount between level 3 and level 3
    const level2TokenDiscount = await htraxToken.connect(user_presales_manager).getDiscountDetails('277777777777777777777777');
    expect(level2TokenDiscount.toString()).to.equal('333333333333333333333332');
    
    // Get token discount for level 3 and above
    const level3TokenDiscount = await htraxToken.connect(user_presales_manager).getDiscountDetails('2777777777777777777777777');
    expect(level3TokenDiscount.toString()).to.equal('3611111111111111111111110');     
  });
});

describe("Token timelock function", function () {
  beforeEach(async function () {
    this.releaseTime = await time.latest();
    const tokenAmount = '69444444444444444444444'
    await htraxToken.transfer(user_executor_role.address, tokenAmount);

    await htraxToken.grantRole(EXECUTOR_ROLE, user_executor_role.address);
    await htraxToken.connect(user_executor_role).transferDiscountedTokens(addr1.address, tokenAmount);
    const addr1_balance = await htraxToken.balanceOf(addr1.address);    
    expect(addr1_balance.toString()).to.equal(tokenAmount);    
  });   
  it("Send timelocked token to addr1", async function() {
    let resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('69444444444444444444443');
  });

  it("Release timelocked token from addr1", async function() {
    const resultTotalTokenLock = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock.toString()).to.equal('69444444444444444444443');
        
    let resultLockedBalanceLength = await htraxToken.connect(addr1).getLockedBalanceLength(addr1.address);
    expect(resultLockedBalanceLength.toString()).to.equal('4');

    console.log ("[6 Months] ---------------------------------------------");
    console.log ("[0 Months] Time now: " + await time.latest());
    await time.increaseTo(this.releaseTime.add(time.duration.seconds(15778465)));
    console.log ("[6 Months] Time after increase: " + await time.latest());
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    const resultTotalTokenLock6 = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address)
    expect(resultTotalTokenLock6.toString()).to.equal('62499999999999999999999');
    
    console.log ("[12 Months] ---------------------------------------------");    
    console.log ("[6 Months] Time now: " + await time.latest());
    await time.increaseTo(this.releaseTime.add(time.duration.seconds(31556928)));
    console.log ("[12 Months] Time after increase: " + await time.latest());
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    const resultTotalTokenLock12 = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock12.toString()).to.equal('41666666666666666666666'); 
    
    console.log ("[18 Months] ---------------------------------------------");    
    console.log ("[12 Months] Time now: " + await time.latest());
    await time.increaseTo(this.releaseTime.add(time.duration.seconds(47335391)));
    console.log ("[18 Months] Time after increase: " + await time.latest());
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    const resultTotalTokenLock18 = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock18.toString()).to.equal('20833333333333333333333');   
    
    console.log ("[24 Months] ---------------------------------------------");    
    console.log ("[18 Months] Time now: " + await time.latest());
    await time.increaseTo(this.releaseTime.add(time.duration.seconds(63113854)));
    console.log ("[24 Months] Time after increase: " + await time.latest());
    await htraxToken.connect(addr1).releaseLockedTokens(addr1.address);
    const resultTotalTokenLock24 = await htraxToken.connect(addr1).getTotalLockedBalance(addr1.address);
    expect(resultTotalTokenLock24.toString()).to.equal('0');

    const totalBalance10Percentage = (resultTotalTokenLock.div(10));
    const totalBalance6 = (totalBalance10Percentage).add(resultTotalTokenLock6);
    expect(totalBalance6.toString()).to.equal('69444444444444444444443');
  });
});
