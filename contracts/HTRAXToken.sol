// contracts/HTRAXToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./access/Ownable.sol";
import "./security/Pausable.sol";
import "./access/AccessControl.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC20/extensions/ERC20Snapshot.sol";
import "./HTRAXTokenSale.sol";

contract HTRAXToken is ERC20, ERC20Snapshot, Ownable, Pausable, AccessControl, HTRAXTokenSale {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
    bytes32 public constant RISK_MANAGER_ROLE = keccak256("RISK_MANAGER_ROLE");

    uint256 private immutable _cap = 375000000 * (10 ** uint256(decimals())); 
    string private _symbol = "HTRAX";
    string private _name = "HTRAX Token";

    mapping(address => bool) public isBlackListed;
   
    constructor() 
    ERC20(_name, _symbol)
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        // token release for phase-1
        _mint(_msgSender(), 93750000 * (10 ** uint256(decimals())));
    }    

     event AddedBlackList(address _address);
     event RemovedBlackList(address _address);

    function mint(address account, uint256 amount) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "Caller is not a minter");
        require(ERC20.totalSupply() + amount <= _cap, "cap exceeded");
        super._mint(account, amount);
    }

    function cap() public view virtual returns (uint256) {
        return _cap;
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

    function transfer(address _to, uint256 _value) override public returns (bool success) {      
        uint256 senderAvailableBalance = balanceOf(_msgSender()) - getTotalLockedBalance(_msgSender());
        require(_value <= senderAvailableBalance, "Transfer amount exceeds locked balance");

        return super.transfer(_to, _value);
    }     

    function transferFrom(address _from, address _to, uint256 _value) override public returns (bool success) {
        uint256 senderAvailableBalance = balanceOf(_from) - getTotalLockedBalance(_msgSender());
        require(_value <= senderAvailableBalance, "Transfer amount exceeds locked balance");

        return super.transferFrom(_from, _to, _value);
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

    function transferLockedTokens(address recipient, uint totalAmount, uint256 lockedAmount, uint128 startDate, 
    uint64 timeInterval, uint256 tokenRelease) public {
        require(hasRole(EXECUTOR_ROLE, _msgSender()), "Caller is not a executor");
        timeLocks[recipient].push(TimeLock(totalAmount, lockedAmount, uint128(startDate), timeInterval, tokenRelease));
        transfer(recipient, totalAmount);
    }

    function transferDiscountedTokens(address recipient, uint totalAmount) public {
        require(hasRole(EXECUTOR_ROLE, _msgSender()), "Caller is not a executor");
        uint256 discountedAmount = getDiscountDetails(totalAmount);
        require(discountedAmount <= balanceOf(_msgSender()), "Transfer amount more then account balance");
        addDiscountTokenLockDetails(recipient, discountedAmount);
        transfer(recipient, discountedAmount);
    }      

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        require(!isBlackListed[from], 'Transfers not allowed');
        require(!isBlackListed[to], 'Transfers not allowed');

        super._beforeTokenTransfer(from, to, amount);       
    }         
}