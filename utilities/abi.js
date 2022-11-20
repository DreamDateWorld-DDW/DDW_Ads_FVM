export const ddw_ads_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "PRICE_PER_WATCH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "adLink",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "keywords",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "watchCount",
          "type": "uint256"
        }
      ],
      "name": "add_listing",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "keywords",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "gender",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "add_user_info",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "keywords",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "watchCount",
          "type": "uint256"
        }
      ],
      "name": "calculate_price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "listingNum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "regKeywords",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "togglePause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "view_keywords",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "listingName",
          "type": "string"
        }
      ],
      "name": "view_listing_analytics",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "lister",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "state",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "keywords",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "adLink",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "watchCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "watchCountAchieved",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "priceLocked",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "spentValue",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "mappingKeywords",
              "type": "string[]"
            },
            {
              "internalType": "uint256[]",
              "name": "mappingGenderEnums",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "mappingWatchCount",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct DDWAds.ReturnListingInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "view_listing_names",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "listingID",
          "type": "uint256"
        }
      ],
      "name": "watch_ad",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "listingName",
          "type": "string"
        }
      ],
      "name": "withdraw_listing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]