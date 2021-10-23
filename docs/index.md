# Functions:

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

- [`transferLockedTokens(address recipient, uint256 totalAmount, uint256 lockedAmount, uint128 startDate, uint64 timeInterval, uint256 tokenRelease)`](#HTRAXToken-transferLockedTokens-address-uint256-uint256-uint128-uint64-uint256-)

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

Note:

- Amount of token need to be in format: _value *10^18

# Function `transferFrom(address _from, address _to, uint256 _value) → bool success` {#HTRAXToken-transferFrom-address-address-uint256-}

See {ERC20-transferFrom}.

Note:

- Amount of token need to be in format: _value *10^18

# Function `addBlackList(address[] _address)` {#HTRAXToken-addBlackList-address---}

Caller with risk manager role can add wallet to blacklist

Wallets added to blacklist are no longer be able to make transactions.

# Function `removeBlackList(address[] _address)` {#HTRAXToken-removeBlackList-address---}

Caller with risk manager role can remove wallet from blacklist

# Function `transferLockedTokens(address recipient, uint256 totalAmount, uint256 lockedAmount, uint128 startDate, uint64 timeInterval, uint256 tokenRelease)` {#HTRAXToken-transferLockedTokens-address-uint256-uint256-uint128-uint64-uint256-}

Caller with executor role can transfer locked tokens.

- recipient: wallet address of the user where tokens needs to transfer

- totalAmount: amount of token that need to be TRANSFER in format: _value *10^18   

- lockedAmount: amount of token that need to be LOCKED in format: _value *10^18  

- startDate: token lock start date in Unix timestamp

- timeInterval: time interval of each release in Unix timestamp

- tokenRelease: amount of token that need to be RELEASE at each interval in format: _value *10^18

# Function `transferDiscountedTokens(address recipient, uint256 totalAmount)` {#HTRAXToken-transferDiscountedTokens-address-uint256-}

Caller with executor role can transfer discounted and locked tokens.

- recipient: wallet address of the user where tokens needs to transfer

- totalAmount: amount of token that need to be TRANSFER in format: _value *10^18

# Event `AddedBlackList(address _address)` {#HTRAXToken-AddedBlackList-address-}

No description

# Event `RemovedBlackList(address _address)` {#HTRAXToken-RemovedBlackList-address-}

No description

# Functions:

- [`getLockedBalanceLength(address account)`](#HTRAXTokenSale-getLockedBalanceLength-address-)

- [`getTotalLockedBalance(address account)`](#HTRAXTokenSale-getTotalLockedBalance-address-)

- [`setSaleStartDate(uint128 _startDate)`](#HTRAXTokenSale-setSaleStartDate-uint128-)

- [`getSaleStartDate()`](#HTRAXTokenSale-getSaleStartDate--)

- [`setSaleEndDate(uint128 _endDate)`](#HTRAXTokenSale-setSaleEndDate-uint128-)

- [`getSaleEndDate()`](#HTRAXTokenSale-getSaleEndDate--)

- [`setLevel1Value(uint256 _tokenAmount)`](#HTRAXTokenSale-setLevel1Value-uint256-)

- [`setLevel2Value(uint256 _tokenAmount)`](#HTRAXTokenSale-setLevel2Value-uint256-)

- [`setLevel3Value(uint256 _tokenAmount)`](#HTRAXTokenSale-setLevel3Value-uint256-)

- [`getLevel1Value()`](#HTRAXTokenSale-getLevel1Value--)

- [`getLevel2Value()`](#HTRAXTokenSale-getLevel2Value--)

- [`getLevel3Value()`](#HTRAXTokenSale-getLevel3Value--)

- [`releaseLockedTokens(address account)`](#HTRAXTokenSale-releaseLockedTokens-address-)

- [`getDiscountDetails(uint256 totalAmount)`](#HTRAXTokenSale-getDiscountDetails-uint256-)

# Function `getLockedBalanceLength(address account) → uint256` {#HTRAXTokenSale-getLockedBalanceLength-address-}

Get count of how many times wallet address have locked tokens.

# Function `getTotalLockedBalance(address account) → uint256` {#HTRAXTokenSale-getTotalLockedBalance-address-}

Get total number of locked tokens for given wallet address.

# Function `setSaleStartDate(uint128 _startDate)` {#HTRAXTokenSale-setSaleStartDate-uint128-}

Caller with pre sales manager role can set token sale start date

- _startDate: start date needs to be in Unix timestamp

# Function `getSaleStartDate() → uint128` {#HTRAXTokenSale-getSaleStartDate--}

returns token sale start date in Unix timestamp

# Function `setSaleEndDate(uint128 _endDate)` {#HTRAXTokenSale-setSaleEndDate-uint128-}

Caller with pre sales manager role can set token sale end date

- _endDate: end date needs to be in Unix timestamp

# Function `getSaleEndDate() → uint128` {#HTRAXTokenSale-getSaleEndDate--}

returns token sale end date in Unix timestamp

# Function `setLevel1Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel1Value-uint256-}

Caller with pre sales manager role can set token amount for level1.

- _tokenAmount: token need to specify in format: _tokenAmount *10^18

# Function `setLevel2Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel2Value-uint256-}

Caller with pre sales manager role can set token amount for level2.

- _tokenAmount: token need to specify in format: _tokenAmount *10^18

# Function `setLevel3Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel3Value-uint256-}

Caller with pre sales manager role can set token amount for level3.

- _tokenAmount: token need to specify in format: _tokenAmount *10^18

# Function `getLevel1Value() → uint256` {#HTRAXTokenSale-getLevel1Value--}

returns Level1 token amount in format _tokenAmount *10^18

# Function `getLevel2Value() → uint256` {#HTRAXTokenSale-getLevel2Value--}

returns Level2 token amount in format _tokenAmount *10^18

# Function `getLevel3Value() → uint256` {#HTRAXTokenSale-getLevel3Value--}

returns Level3 token amount in format _tokenAmount *10^18

# Function `releaseLockedTokens(address account)` {#HTRAXTokenSale-releaseLockedTokens-address-}

Caller can release locked tokens.

- account: wallet address from where tokens need to be released

# Function `getDiscountDetails(uint256 totalAmount) → uint256 discountedAmount` {#HTRAXTokenSale-getDiscountDetails-uint256-}

Caller can get token discount details. 

Based on entered token amount discount will be displayed.

- totalAmount: Amount of token need to be in format: totalAmount *10^18 

Requirements:

- `saleStartDate` needs to be configured. See {HTRAXTokenSale-setSaleStartDate}

- `saleEndDate` needs to be configured. See {HTRAXTokenSale-setSaleEndDate}

- `level1` needs to be configured. See {HTRAXTokenSale-setLevel1Value}

- `level2` needs to be configured. See {HTRAXTokenSale-setLevel2Value}

- `level3` needs to be configured. See {HTRAXTokenSale-setLevel2Value}

External interface of AccessControl declared to support ERC165 detection.

# Functions:

- [`hasRole(bytes32 role, address account)`](#IAccessControl-hasRole-bytes32-address-)

- [`getRoleAdmin(bytes32 role)`](#IAccessControl-getRoleAdmin-bytes32-)

- [`grantRole(bytes32 role, address account)`](#IAccessControl-grantRole-bytes32-address-)

- [`revokeRole(bytes32 role, address account)`](#IAccessControl-revokeRole-bytes32-address-)

- [`renounceRole(bytes32 role, address account)`](#IAccessControl-renounceRole-bytes32-address-)

# Function `hasRole(bytes32 role, address account) → bool` {#IAccessControl-hasRole-bytes32-address-}

No description

# Function `getRoleAdmin(bytes32 role) → bytes32` {#IAccessControl-getRoleAdmin-bytes32-}

No description

# Function `grantRole(bytes32 role, address account)` {#IAccessControl-grantRole-bytes32-address-}

No description

# Function `revokeRole(bytes32 role, address account)` {#IAccessControl-revokeRole-bytes32-address-}

No description

# Function `renounceRole(bytes32 role, address account)` {#IAccessControl-renounceRole-bytes32-address-}

No description

Contract module that allows children to implement role-based access

control mechanisms. This is a lightweight version that doesn't allow enumerating role

members except through off-chain means by accessing the contract event logs. Some

applications may benefit from on-chain enumerability, for those cases see

{AccessControlEnumerable}.

Roles are referred to by their `bytes32` identifier. These should be exposed

in the external API and be unique. The best way to achieve this is by

using `public constant` hash digests:

```

bytes32 public constant MY_ROLE = keccak256("MY_ROLE");

```

Roles can be used to represent a set of permissions. To restrict access to a

function call, use {hasRole}:

```

function foo() public {

    require(hasRole(MY_ROLE, msg.sender));

    ...

}

```

Roles can be granted and revoked dynamically via the {grantRole} and

{revokeRole} functions. Each role has an associated admin role, and only

accounts that have a role's admin role can call {grantRole} and {revokeRole}.

By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means

that only accounts with this role will be able to grant or revoke other

roles. More complex role relationships can be created by using

{_setRoleAdmin}.

WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to

grant and revoke this role. Extra precautions should be taken to secure

accounts that have been granted it.

# Functions:

- [`supportsInterface(bytes4 interfaceId)`](#AccessControl-supportsInterface-bytes4-)

- [`hasRole(bytes32 role, address account)`](#AccessControl-hasRole-bytes32-address-)

- [`getRoleAdmin(bytes32 role)`](#AccessControl-getRoleAdmin-bytes32-)

- [`grantRole(bytes32 role, address account)`](#AccessControl-grantRole-bytes32-address-)

- [`revokeRole(bytes32 role, address account)`](#AccessControl-revokeRole-bytes32-address-)

- [`renounceRole(bytes32 role, address account)`](#AccessControl-renounceRole-bytes32-address-)

# Events:

- [`RoleAdminChanged(bytes32 role, bytes32 previousAdminRole, bytes32 newAdminRole)`](#AccessControl-RoleAdminChanged-bytes32-bytes32-bytes32-)

- [`RoleGranted(bytes32 role, address account, address sender)`](#AccessControl-RoleGranted-bytes32-address-address-)

- [`RoleRevoked(bytes32 role, address account, address sender)`](#AccessControl-RoleRevoked-bytes32-address-address-)

# Function `supportsInterface(bytes4 interfaceId) → bool` {#AccessControl-supportsInterface-bytes4-}

See {IERC165-supportsInterface}.

# Function `hasRole(bytes32 role, address account) → bool` {#AccessControl-hasRole-bytes32-address-}

Returns `true` if `account` has been granted `role`.

# Function `getRoleAdmin(bytes32 role) → bytes32` {#AccessControl-getRoleAdmin-bytes32-}

Returns the admin role that controls `role`. See {grantRole} and

{revokeRole}.

To change a role's admin, use {_setRoleAdmin}.

# Function `grantRole(bytes32 role, address account)` {#AccessControl-grantRole-bytes32-address-}

Grants `role` to `account`.

If `account` had not been already granted `role`, emits a {RoleGranted}

event.

Requirements:

- the caller must have ``role``'s admin role.

# Function `revokeRole(bytes32 role, address account)` {#AccessControl-revokeRole-bytes32-address-}

Revokes `role` from `account`.

If `account` had been granted `role`, emits a {RoleRevoked} event.

Requirements:

- the caller must have ``role``'s admin role.

# Function `renounceRole(bytes32 role, address account)` {#AccessControl-renounceRole-bytes32-address-}

Revokes `role` from the calling account.

Roles are often managed via {grantRole} and {revokeRole}: this function's

purpose is to provide a mechanism for accounts to lose their privileges

if they are compromised (such as when a trusted device is misplaced).

If the calling account had been granted `role`, emits a {RoleRevoked}

event.

Requirements:

- the caller must be `account`.

# Event `RoleAdminChanged(bytes32 role, bytes32 previousAdminRole, bytes32 newAdminRole)` {#AccessControl-RoleAdminChanged-bytes32-bytes32-bytes32-}

Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`

`DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite

{RoleAdminChanged} not being emitted signaling this.

_Available since v3.1._

# Event `RoleGranted(bytes32 role, address account, address sender)` {#AccessControl-RoleGranted-bytes32-address-address-}

Emitted when `account` is granted `role`.

`sender` is the account that originated the contract call, an admin role

bearer except when using {_setupRole}.

# Event `RoleRevoked(bytes32 role, address account, address sender)` {#AccessControl-RoleRevoked-bytes32-address-address-}

Emitted when `account` is revoked `role`.

`sender` is the account that originated the contract call:

  - if using `revokeRole`, it is the admin role bearer

  - if using `renounceRole`, it is the role bearer (i.e. `account`)

Contract module which provides a basic access control mechanism, where

there is an account (an owner) that can be granted exclusive access to

specific functions.

By default, the owner account will be the one that deploys the contract. This

can later be changed with {transferOwnership}.

This module is used through inheritance. It will make available the modifier

`onlyOwner`, which can be applied to your functions to restrict their use to

the owner.

# Functions:

- [`owner()`](#Ownable-owner--)

- [`transferOwnership(address newOwner)`](#Ownable-transferOwnership-address-)

# Events:

- [`OwnershipTransferred(address previousOwner, address newOwner)`](#Ownable-OwnershipTransferred-address-address-)

# Function `owner() → address` {#Ownable-owner--}

Returns the address of the current owner.

# Function `transferOwnership(address newOwner)` {#Ownable-transferOwnership-address-}

Transfers ownership of the contract to a new account (`newOwner`).

Can only be called by the current owner.

# Event `OwnershipTransferred(address previousOwner, address newOwner)` {#Ownable-OwnershipTransferred-address-address-}

No description

Contract module which allows children to implement an emergency stop

mechanism that can be triggered by an authorized account.

This module is used through inheritance. It will make available the

modifiers `whenNotPaused` and `whenPaused`, which can be applied to

the functions of your contract. Note that they will not be pausable by

simply including this module, only once the modifiers are put in place.

# Functions:

- [`paused()`](#Pausable-paused--)

# Events:

- [`Paused(address account)`](#Pausable-Paused-address-)

- [`Unpaused(address account)`](#Pausable-Unpaused-address-)

# Function `paused() → bool` {#Pausable-paused--}

Returns true if the contract is paused, and false otherwise.

# Event `Paused(address account)` {#Pausable-Paused-address-}

Emitted when the pause is triggered by `account`.

# Event `Unpaused(address account)` {#Pausable-Unpaused-address-}

Emitted when the pause is lifted by `account`.

Implementation of the {IERC20} interface.

This implementation is agnostic to the way tokens are created. This means

that a supply mechanism has to be added in a derived contract using {_mint}.

For a generic mechanism see {ERC20PresetMinterPauser}.

TIP: For a detailed writeup see our guide

https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How to implement supply mechanisms].

We have followed general OpenZeppelin Contracts guidelines: functions revert instead returning `false` on failure. This behavior is nonetheless conventional and does not conflict with the expectations of ERC20 applications.

Additionally, an {Approval} event is emitted on calls to {transferFrom}.

This allows applications to reconstruct the allowance for all accounts just by listening to said events. Other implementations of the EIP may not emit these events, as it isn't required by the specification.

Finally, the non-standard {decreaseAllowance} and {increaseAllowance} functions have been added to mitigate the well-known issues around setting allowances. See {IERC20-approve}.

# Functions:

- [`constructor(string name_, string symbol_)`](#ERC20-constructor-string-string-)

- [`name()`](#ERC20-name--)

- [`symbol()`](#ERC20-symbol--)

- [`decimals()`](#ERC20-decimals--)

- [`totalSupply()`](#ERC20-totalSupply--)

- [`balanceOf(address account)`](#ERC20-balanceOf-address-)

- [`transfer(address recipient, uint256 amount)`](#ERC20-transfer-address-uint256-)

- [`allowance(address owner, address spender)`](#ERC20-allowance-address-address-)

- [`approve(address spender, uint256 amount)`](#ERC20-approve-address-uint256-)

- [`transferFrom(address sender, address recipient, uint256 amount)`](#ERC20-transferFrom-address-address-uint256-)

- [`increaseAllowance(address spender, uint256 addedValue)`](#ERC20-increaseAllowance-address-uint256-)

- [`decreaseAllowance(address spender, uint256 subtractedValue)`](#ERC20-decreaseAllowance-address-uint256-)

# Function `constructor(string name_, string symbol_)` {#ERC20-constructor-string-string-}

Sets the values for {name} and {symbol}.

The default value of {decimals} is 18. To select a different value for {decimals} you should overload it.

All two of these values are immutable: they can only be set once during construction.

# Function `name() → string` {#ERC20-name--}

Returns the name of the token.

# Function `symbol() → string` {#ERC20-symbol--}

Returns the symbol of the token, usually a shorter version of the name.

# Function `decimals() → uint8` {#ERC20-decimals--}

Returns the number of decimals used to get its user representation.

For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`).

Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless this function is overridden;

NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.

# Function `totalSupply() → uint256` {#ERC20-totalSupply--}

See {IERC20-totalSupply}.

# Function `balanceOf(address account) → uint256` {#ERC20-balanceOf-address-}

See {IERC20-balanceOf}.

# Function `transfer(address recipient, uint256 amount) → bool` {#ERC20-transfer-address-uint256-}

See {IERC20-transfer}.

Requirements:

- `recipient` cannot be the zero address.

- the caller must have a balance of at least `amount`.

# Function `allowance(address owner, address spender) → uint256` {#ERC20-allowance-address-address-}

See {IERC20-allowance}.

# Function `approve(address spender, uint256 amount) → bool` {#ERC20-approve-address-uint256-}

See {IERC20-approve}.

Requirements:

- `spender` cannot be the zero address.

# Function `transferFrom(address sender, address recipient, uint256 amount) → bool` {#ERC20-transferFrom-address-address-uint256-}

See {IERC20-transferFrom}.

Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}.

Requirements:

- `sender` and `recipient` cannot be the zero address.

- `sender` must have a balance of at least `amount`.

- the caller must have allowance for ``sender``'s tokens of at least

`amount`.

# Function `increaseAllowance(address spender, uint256 addedValue) → bool` {#ERC20-increaseAllowance-address-uint256-}

Atomically increases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.

# Function `decreaseAllowance(address spender, uint256 subtractedValue) → bool` {#ERC20-decreaseAllowance-address-uint256-}

Atomically decreases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.

- `spender` must have allowance for the caller of at least

`subtractedValue`.

Interface of the ERC20 standard as defined in the EIP.

# Functions:

- [`totalSupply()`](#IERC20-totalSupply--)

- [`balanceOf(address account)`](#IERC20-balanceOf-address-)

- [`transfer(address recipient, uint256 amount)`](#IERC20-transfer-address-uint256-)

- [`allowance(address owner, address spender)`](#IERC20-allowance-address-address-)

- [`approve(address spender, uint256 amount)`](#IERC20-approve-address-uint256-)

- [`transferFrom(address sender, address recipient, uint256 amount)`](#IERC20-transferFrom-address-address-uint256-)

# Events:

- [`Transfer(address from, address to, uint256 value)`](#IERC20-Transfer-address-address-uint256-)

- [`Approval(address owner, address spender, uint256 value)`](#IERC20-Approval-address-address-uint256-)

# Function `totalSupply() → uint256` {#IERC20-totalSupply--}

Returns the amount of tokens in existence.

# Function `balanceOf(address account) → uint256` {#IERC20-balanceOf-address-}

Returns the amount of tokens owned by `account`.

# Function `transfer(address recipient, uint256 amount) → bool` {#IERC20-transfer-address-uint256-}

Moves `amount` tokens from the caller's account to `recipient`.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.

# Function `allowance(address owner, address spender) → uint256` {#IERC20-allowance-address-address-}

Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default.

This value changes when {approve} or {transferFrom} are called.

# Function `approve(address spender, uint256 amount) → bool` {#IERC20-approve-address-uint256-}

Sets `amount` as the allowance of `spender` over the caller's tokens.

Returns a boolean value indicating whether the operation succeeded.

IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:

https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Emits an {Approval} event.

# Function `transferFrom(address sender, address recipient, uint256 amount) → bool` {#IERC20-transferFrom-address-address-uint256-}

Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.

# Event `Transfer(address from, address to, uint256 value)` {#IERC20-Transfer-address-address-uint256-}

Emitted when `value` tokens are moved from one account (`from`) to another (`to`).

Note that `value` may be zero.

# Event `Approval(address owner, address spender, uint256 value)` {#IERC20-Approval-address-address-uint256-}

Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.

This contract extends an ERC20 token with a snapshot mechanism. When a snapshot is created, the balances and total supply at the time are recorded for later access.

This can be used to safely create mechanisms based on token balances such as trustless dividends or weighted voting.

In naive implementations it's possible to perform a "double spend" attack by reusing the same balance from different accounts. By using snapshots to calculate dividends or voting power, those attacks no longer apply. It can also be used to create an efficient ERC20 forking mechanism.

Snapshots are created by the internal {_snapshot} function, which will emit the {Snapshot} event and return a snapshot id. To get the total supply at the time of a snapshot, call the function {totalSupplyAt} with the snapshot id. To get the balance of an account at the time of a snapshot, call the {balanceOfAt} function with the snapshot id and the account address.

==== Gas Costs

Snapshots are efficient. Snapshot creation is _O(1)_. Retrieval of balances or total supply from a snapshot is _O(log n)_ in the number of snapshots that have been created, although _n_ for a specific account will generally be much smaller since identical balances in subsequent snapshots are stored as a single entry.

There is a constant overhead for normal ERC20 transfers due to the additional snapshot bookkeeping. This overhead is only significant for the first transfer that immediately follows a snapshot for a particular account. Subsequent transfers will have normal cost until the next snapshot, and so on.

# Functions:
- [`balanceOfAt(address account, uint256 snapshotId)`](#ERC20Snapshot-balanceOfAt-address-uint256-)
- [`totalSupplyAt(uint256 snapshotId)`](#ERC20Snapshot-totalSupplyAt-uint256-)

# Events:
- [`Snapshot(uint256 id)`](#ERC20Snapshot-Snapshot-uint256-)

# Function `balanceOfAt(address account, uint256 snapshotId) → uint256` {#ERC20Snapshot-balanceOfAt-address-uint256-}

Retrieves the balance of `account` at the time `snapshotId` was created.

# Function `totalSupplyAt(uint256 snapshotId) → uint256` {#ERC20Snapshot-totalSupplyAt-uint256-}

Retrieves the total supply at the time `snapshotId` was created.

# Event `Snapshot(uint256 id)` {#ERC20Snapshot-Snapshot-uint256-}

Emitted by {_snapshot} when a snapshot identified by `id` is created.

Interface for the optional metadata functions from the ERC20 standard.

_Available since v4.1._

# Functions:

- [`name()`](#IERC20Metadata-name--)

- [`symbol()`](#IERC20Metadata-symbol--)

- [`decimals()`](#IERC20Metadata-decimals--)

# Function `name() → string` {#IERC20Metadata-name--}

Returns the name of the token.

# Function `symbol() → string` {#IERC20Metadata-symbol--}

Returns the symbol of the token.

# Function `decimals() → uint8` {#IERC20Metadata-decimals--}

Returns the decimals places of the token.

Collection of functions related to array types.

# Functions:

# Functions:

Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number of elements in a mapping, issuing ERC721 ids, or counting request ids.

Include with `using Counters for Counters.Counter;`

# Functions:

String operations.

# Functions:

Implementation of the {IERC165} interface.

Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check for the additional interface id that will be supported. For example:

```solidity

function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {

    return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);

}

```

Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.

# Functions:

- [`supportsInterface(bytes4 interfaceId)`](#ERC165-supportsInterface-bytes4-)

# Function `supportsInterface(bytes4 interfaceId) → bool` {#ERC165-supportsInterface-bytes4-}

See {IERC165-supportsInterface}.

Interface of the ERC165 standard, as defined in the https://eips.ethereum.org/EIPS/eip-165[EIP].

Implementers can declare support of contract interfaces, which can then be queried by others ({ERC165Checker}).

For an implementation, see {ERC165}.

# Functions:

- [`supportsInterface(bytes4 interfaceId)`](#IERC165-supportsInterface-bytes4-)

# Function `supportsInterface(bytes4 interfaceId) → bool` {#IERC165-supportsInterface-bytes4-}

Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created.

This function call must use less than 30 000 gas.

Standard math utilities missing in the Solidity language.

# Functions:
