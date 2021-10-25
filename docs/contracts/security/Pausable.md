Contract module which allows children to implement an emergency stop mechanism that can be triggered by an authorized account.

This module is used through inheritance. It will make available the modifiers `whenNotPaused` and `whenPaused`, which can be applied to the functions of your contract. Note that they will not be pausable by simply including this module, only once the modifiers are put in place.

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