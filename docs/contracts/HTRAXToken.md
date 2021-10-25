# Functions:

- <a name="[`mint(address account, uint256 amount)`]"></a>
- 
- [`mint(address account, uint256 amount)`](#HTRAXToken-mint-address-uint256-)

- [`cap()`](#HTRAXToken-cap--)

- [`burn(uint256 amount)`](#HTRAXToken-burn-uint256-)

- [`burnFrom(address account, uint256 amount)`](#HTRAXToken-burnFrom-address-uint256-)

- [`snapshot()`](#HTRAXToken-snapshot--)

- [`pause()`](#HTRAXToken-pause--)

- [`unpause()`](#HTRAXToken-unpause--)

- [`transfer(address _to, uint256 _value)`](#HTRAXToken-transfer-address-uint256-)

- [`transferFrom(address _from, address _to, uint256 _value)`](#HTRAXToken-transferFrom-address-address-uint256-)

- [`addBlackList(address[] _address)`](#HTRAXToken-addBlackList-address---)

- [`removeBlackList(address[] _address)`](#HTRAXToken-removeBlackList-address---)

- [`transferDiscountedTokens(address recipient, uint256 totalAmount)`](#HTRAXToken-transferDiscountedTokens-address-uint256-)

# Events:

- [`AddedBlackList(address _address)`](#HTRAXToken-AddedBlackList-address-)

- [`RemovedBlackList(address _address)`](#HTRAXToken-RemovedBlackList-address-)

# Function `mint(address account, uint256 amount)` {#HTRAXToken-mint-address-uint256-}

caller with minter role can mint the token

# Function `cap() → uint256` {#HTRAXToken-cap--}

Returns total cap of the token

# Function `burn(uint256 amount)` {#HTRAXToken-burn-uint256-}

See {ERC20-_burn}.    

caller with burner role can burn the token

# Function `burnFrom(address account, uint256 amount)` {#HTRAXToken-burnFrom-address-uint256-}

See {ERC20-burnFrom}.

# Function `snapshot()` {#HTRAXToken-snapshot--}

caller with risk manager role can create a snapshot

# Function `pause()` {#HTRAXToken-pause--}

Caller with risk manager role can pause the contract

# Function `unpause()` {#HTRAXToken-unpause--}

Caller with risk manager role can unpause the contract

# Function `transfer(address _to, uint256 _value) → bool success` {#HTRAXToken-transfer-address-uint256-}

See {ERC20-transferFrom}.

## Parameters:

- `_value`: of token need to be in format: amount *10^18

# Function `transferFrom(address _from, address _to, uint256 _value) → bool success` {#HTRAXToken-transferFrom-address-address-uint256-}

See {ERC20-transferFrom}.

## Parameters:

- `_value`: of token need to be in format: _value *10^18

# Function `addBlackList(address[] _address)` {#HTRAXToken-addBlackList-address---}

Caller with risk manager role can add wallet to blacklist

Wallets added to blacklist are no longer be able to make transactions.

# Function `removeBlackList(address[] _address)` {#HTRAXToken-removeBlackList-address---}

Caller with risk manager role can remove wallet from blacklist

# Function `transferDiscountedTokens(address recipient, uint256 totalAmount)` {#HTRAXToken-transferDiscountedTokens-address-uint256-}

Caller with executor role can transfer discounted and locked tokens.

## Parameters:

- `wallet`: address of the user where tokens needs to transfer

- `amount`: of token that need to be TRANSFER in format: amount *10^18

# Event `AddedBlackList(address _address)` {#HTRAXToken-AddedBlackList-address-}

Emits an {AddedBlackList} event indicating wallet details with is added to the blacklist.

# Event `RemovedBlackList(address _address)` {#HTRAXToken-RemovedBlackList-address-}

Emits an {RemovedBlackList} event indicating wallet details with is removed from the blacklist.
