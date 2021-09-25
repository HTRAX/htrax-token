// contracts/HTRAXToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./access/Ownable.sol";
import "./security/Pausable.sol";
import "./access/AccessControl.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC20/extensions/ERC20Snapshot.sol";

contract HTRAXToken is ERC20, ERC20Snapshot, Ownable, Pausable, AccessControl   {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant CONTRACT_MANAGER_ROLE = keccak256("CONTRACT_MANAGER_ROLE");
    bytes32 public constant RISK_MANAGER_ROLE = keccak256("RISK_MANAGER_ROLE");    
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    uint256 private immutable _cap = 375000000 * (10 ** uint256(decimals())); 
    string private _symbol = "HTRAX";
    string private _name = "HTRAX Token";

    bool public limitTransactions;
    mapping(address => bool) public limitTransactionsWhiteList;
    mapping(address => uint) public lastTXBlock;
    mapping(address => bool) public isBlackListed;
    
    struct TimeLock {
        uint256 totalAmount;
        uint256 lockedAmount;
        uint128 startDate; // Unix Epoch timestamp
        uint64 timeInterval; // Unix Epoch timestamp
        uint256 tokenRelease;
    }
    mapping (address => TimeLock[]) public timeLocks; 
        
    constructor() 
    ERC20(_name, _symbol)
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        // token release for phase-1
        _mint(_msgSender(), 93750000 * (10 ** uint256(decimals())));
    }    

     event AddedBlackList(address _address);
     event RemovedBlackList(address _address);

    function mint(address account, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= _cap, "cap exceeded");
        super._mint(account, amount);
    }

    function cap() public view virtual returns (uint256) {
        return _cap;
    } 

    function getLockedBalanceLength(address account) public view returns (uint) {
        return timeLocks[account].length;
    }

    function getTotalLockedBalance(address account) public view returns (uint256) {
        uint256 lockedBalance = 0;
        for(uint i = 0 ; i<getLockedBalanceLength(account); i++) {
            lockedBalance += timeLocks[account][i].lockedAmount;
        }        
        return lockedBalance;
    }        

    function burn(uint256 amount) public {
        require(hasRole(BURNER_ROLE, _msgSender()), "Caller is not a burner");
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public {
        require(hasRole(BURNER_ROLE, _msgSender()), "Caller is not a burner");

        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        _approve(account, _msgSender(), currentAllowance - amount);
        _burn(account, amount);
    }             

    function snapshot() public {
        require(hasRole(RISK_MANAGER_ROLE, _msgSender()), "Caller is not a risk manager");
        _snapshot();
    }

    function pause() public {
        require(hasRole(RISK_MANAGER_ROLE, _msgSender()), "Caller is not a risk manager");
        _pause();
    }

    function unpause() public {
        require(hasRole(RISK_MANAGER_ROLE, _msgSender()), "Caller is not a risk manager");
        _unpause();
    }

    function enableTransactionLimit() public {
        require(hasRole(CONTRACT_MANAGER_ROLE, _msgSender()), "Caller is not a contract manager");
        limitTransactions = true;
    }
    
    function disableTransactionLimit() public {
        require(hasRole(CONTRACT_MANAGER_ROLE, _msgSender()), "Caller is not a contract manager");
        limitTransactions = false;
    }
    
    function includeTransactionsWhiteList(address account) public {
        require(hasRole(CONTRACT_MANAGER_ROLE, _msgSender()), "Caller is not a contract manager");
        limitTransactionsWhiteList[account] = true;
    }
    
    function removeTransactionsWhiteList(address account) public {
        require(hasRole(CONTRACT_MANAGER_ROLE, _msgSender()), "Caller is not a contract manager");
        limitTransactionsWhiteList[account] = false;
    }

    function addBlackList(address[] memory _address) public {
        require(hasRole(RISK_MANAGER_ROLE, _msgSender()), "Caller is not a risk manager");
        for (uint256 i = 0; i < _address.length; i++) {
            require(_address[i] != address(0), 'The address is address 0');
            require(_address[i] != owner(), 'The address is the owner');
            if (!isBlackListed[_address[i]]) {
                isBlackListed[_address[i]] = true;
                emit AddedBlackList(_address[i]);
            }
        }
    }    

    function removeBlackList(address[] memory _address) public {
        require(hasRole(RISK_MANAGER_ROLE, _msgSender()), "Caller is not a risk manager");
        for (uint256 i = 0; i < _address.length; i++) {
            if (isBlackListed[_address[i]]) {
                isBlackListed[_address[i]] = false;
                emit RemovedBlackList(_address[i]);
            }
        }
    }  

    function checkTransferLimit() internal returns (bool txAllowed) {
        if (limitTransactions == true && limitTransactionsWhiteList[_msgSender()] != true) {
            if (lastTXBlock[_msgSender()] == block.number) {
                return false;
            } else {
                lastTXBlock[_msgSender()] = block.number;
                return true;
            }
        } else {
            return true;
        }
    }

    function transferLockedTokens(address recipient, uint totalAmount, uint256 lockedAmount, uint128 startDate, uint64 timeInterval, uint256 tokenRelease) public {
        require(hasRole(EXECUTOR_ROLE, _msgSender()), "Caller is not a executor");
        timeLocks[recipient].push(TimeLock(totalAmount, lockedAmount, uint128(startDate), timeInterval, tokenRelease));
        transfer(recipient, totalAmount);
    }

    function releaseLockedTokens(address account) public {
        for(uint i = 0 ; i<getLockedBalanceLength(account); i++) {        
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

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        require(!isBlackListed[from], 'Transfers not allowed');
        require(!isBlackListed[to], 'Transfers not allowed');       
        require(checkTransferLimit(), "Transfers are limited to 1 per block");

        super._beforeTokenTransfer(from, to, amount);       
    }         
}