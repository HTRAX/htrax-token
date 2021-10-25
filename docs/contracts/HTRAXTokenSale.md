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

# Function `getLockedBalanceLength(address account) → uint256`

Get count of how many times wallet address have locked tokens.

# Function `getTotalLockedBalance(address account) → uint256` {#HTRAXTokenSale-getTotalLockedBalance-address-}

Returns total number of locked token balance for given wallet address.

# Function `setSaleStartDate(uint128 _startDate)` {#HTRAXTokenSale-setSaleStartDate-uint128-}

Caller with pre sales manager role can set token sale start date

## Parameters:

- `_startDate`: start date needs to be in Unix timestamp

# Function `getSaleStartDate() → uint128` {#HTRAXTokenSale-getSaleStartDate--}

returns token sale start date in Unix timestamp

# Function `setSaleEndDate(uint128 _endDate)` {#HTRAXTokenSale-setSaleEndDate-uint128-}

Caller with pre sales manager role can set token sale end date

## Parameters:

- `_endDate`: end date needs to be in Unix timestamp

# Function `getSaleEndDate() → uint128` {#HTRAXTokenSale-getSaleEndDate--}

returns token sale end date in Unix timestamp

# Function `setLevel1Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel1Value-uint256-}

Caller with pre sales manager role can set token amount for level1.

## Parameters:

- `_tokenAmount`: token need to specify in format: _tokenAmount *10^18

# Function `setLevel2Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel2Value-uint256-}

Caller with pre sales manager role can set token amount for level2.

## Parameters:

- `_tokenAmount`: token need to specify in format: _tokenAmount *10^18

# Function `setLevel3Value(uint256 _tokenAmount)` {#HTRAXTokenSale-setLevel3Value-uint256-}

Caller with pre sales manager role can set token amount for level3.

## Parameters:

- `_tokenAmount`: token need to specify in format: _tokenAmount *10^18

# Function `getLevel1Value() → uint256` {#HTRAXTokenSale-getLevel1Value--}

returns Level1 token amount in format _tokenAmount *10^18

# Function `getLevel2Value() → uint256` {#HTRAXTokenSale-getLevel2Value--}

returns Level2 token amount in format _tokenAmount *10^18

# Function `getLevel3Value() → uint256` {#HTRAXTokenSale-getLevel3Value--}

returns Level3 token amount in format _tokenAmount *10^18

# Function `releaseLockedTokens(address account)` {#HTRAXTokenSale-releaseLockedTokens-address-}

Caller can release locked tokens.

## Parameters:

- `account`: wallet address from where tokens need to be released

# Function `getDiscountDetails(uint256 totalAmount) → uint256 discountedAmount`

Caller can get token discount details. 

Based on entered token amount discount will be displayed.

## Parameters:

- `totalAmount`: Amount of token need to be in format: totalAmount *10^18 

Requirements:

- `saleStartDate` needs to be configured. See {HTRAXTokenSale-setSaleStartDate}

- `saleEndDate` needs to be configured. See {HTRAXTokenSale-setSaleEndDate}

- `level1` needs to be configured. See {HTRAXTokenSale-setLevel1Value}

- `level2` needs to be configured. See {HTRAXTokenSale-setLevel2Value}

- `level3` needs to be configured. See {HTRAXTokenSale-setLevel2Value}
