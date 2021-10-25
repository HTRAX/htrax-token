Implementation of the {IERC20} interface.

This implementation is agnostic to the way tokens are created. This means that a supply mechanism has to be added in a derived contract using {_mint}.

For a generic mechanism see {ERC20PresetMinterPauser}.

TIP: For a detailed writeup see our guide
https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Howto implement supply mechanisms].

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
- [`totalBurned()`](#ERC20-totalBurned--)
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

# Function `totalBurned() → uint256` {#ERC20-totalBurned--}
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
- the caller must have allowance for ``sender``'s tokens of at least `amount`.

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
- `spender` must have allowance for the caller of at least `subtractedValue`.