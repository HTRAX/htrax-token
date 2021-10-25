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
