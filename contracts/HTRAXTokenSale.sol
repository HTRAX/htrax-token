// contracts/HTRAXToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./access/AccessControl.sol";

abstract contract HTRAXTokenSale is AccessControl {
    bytes32 public constant PRESALES_MANAGER_ROLE = keccak256("PRESALES_MANAGER_ROLE");
    // Configuration of pre ico conditions
    uint128 saleStartDate;
    uint128 saleEndDate;
    uint256 level1;
    uint256 level2;
    uint256 level3;
    
    struct TimeLock {
        uint256 totalAmount;
        uint256 lockedAmount;
        uint128 startDate; // Unix Epoch timestamp
        uint64 timeInterval; // Unix Epoch timestamp
        uint256 tokenRelease;
    }
    mapping (address => TimeLock[]) internal timeLocks;

    function getLockedBalanceLength(address account) public view virtual returns (uint) {
        return timeLocks[account].length;
    }

    function getTotalLockedBalance(address account) public view virtual returns (uint256) {
        uint256 lockedBalance = 0;
        for(uint i = 0 ; i<getLockedBalanceLength(account); i++) {
            lockedBalance += timeLocks[account][i].lockedAmount;
        }        
        return lockedBalance;
    }

    function setSaleStartDate(uint128 _startDate) public {
        require(hasRole(PRESALES_MANAGER_ROLE, _msgSender()), "Caller is not a presales manager");
        saleStartDate = _startDate;
    }

    function getSaleStartDate() public view virtual returns (uint128) {
        return saleStartDate;
    } 

    function setSaleEndDate(uint128 _endDate) public {
        require(hasRole(PRESALES_MANAGER_ROLE, _msgSender()), "Caller is not a presales manager");
        saleEndDate = _endDate;
    }

    function getSaleEndDate() public view virtual returns (uint128) {
        return saleEndDate;
    }    

    function setLevel1Value(uint256 _levelAmount) public {
        require(hasRole(PRESALES_MANAGER_ROLE, _msgSender()), "Caller is not a presales manager");
        level1 = _levelAmount;
    }    
    
    function setLevel2Value(uint256 _levelAmount) public {
        require(hasRole(PRESALES_MANAGER_ROLE, _msgSender()), "Caller is not a presales manager");
        level2 = _levelAmount;
    }

    function setLevel3Value(uint256 _levelAmount) public {
        require(hasRole(PRESALES_MANAGER_ROLE, _msgSender()), "Caller is not a presales manager");
        level3 = _levelAmount;
    }

    function getLevel1Value() public view virtual returns (uint256) {
        return level1;
    }      

    function getLevel2Value() public view virtual returns (uint256) {
        return level2;
    }   

    function getLevel3Value() public view virtual returns (uint256) {
        return level3;
    }       
    function releaseLockedTokens(address account) public {
        for(uint i = 0; i < getLockedBalanceLength(account); i++) {        
            unchecked {
                uint256 timeDiff = block.timestamp - uint256(timeLocks[account][i].startDate);
                uint256 steps = (timeDiff / uint256(timeLocks[account][i].timeInterval));
                uint256 unlockableAmount = (uint256(timeLocks[account][i].tokenRelease) * steps);
                if (unlockableAmount >= timeLocks[account][i].totalAmount) {
                    timeLocks[account][i].lockedAmount = 0;
                } else {
                    timeLocks[account][i].lockedAmount = timeLocks[account][i].totalAmount - unlockableAmount;
                }
            }
        }
    }

    function getDiscountDetails(uint totalAmount) public view virtual returns (uint256 discountedAmount){
        if(block.timestamp >= saleStartDate && block.timestamp <= saleEndDate)
        {
            if (totalAmount >= level1 && totalAmount < level2) {
                discountedAmount = totalAmount + (totalAmount*10)/100;
            } else if (totalAmount >= level2 && totalAmount < level3) {
                discountedAmount = totalAmount + (totalAmount*20)/100;
            } else if (totalAmount >= level3) {
                discountedAmount = totalAmount + (totalAmount*30)/100;
            } else {
                discountedAmount = totalAmount;
            }
        } else {
                discountedAmount = totalAmount;
        }

        return discountedAmount;
    }

    function addDiscountTokenLockDetails(address recipient, uint256 tokenAmount) internal {
        // Release 10% after 6 months from transfer date
        uint256 lockedAmount10 = (tokenAmount*10)/100;
        timeLocks[recipient].push(TimeLock(lockedAmount10, lockedAmount10, 
        uint128(block.timestamp), 15778463, lockedAmount10));

        //uint256 lockedAmount30 = (tokenAmount*30)/100;
        uint256 lockedAmount30 = ((tokenAmount-lockedAmount10)/3);

        // Release 30% after 12 months from transfer date
        timeLocks[recipient].push(TimeLock(lockedAmount30, lockedAmount30, 
        uint128(block.timestamp), 31556926, lockedAmount30));

        // Release 30% after 18 months from transfer date
        timeLocks[recipient].push(TimeLock(lockedAmount30, lockedAmount30, 
        uint128(block.timestamp), 47335389, lockedAmount30));

        // Release 30% after 24 months from transfer date
        timeLocks[recipient].push(TimeLock(lockedAmount30, lockedAmount30, 
        uint128(block.timestamp), 63113852, lockedAmount30));                
    }    
}