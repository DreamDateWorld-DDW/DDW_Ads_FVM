// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4 <0.9.0;

contract DDWAds {


struct userInfo {
    string[] keywords;
    Gender gender;
}

struct ListerInfo {
    uint256[] listingID;
    string[] listingName; 
}

enum ListingState{START, END, WITHDRAWN}
enum Gender{MALE, FEMALE}

struct ListingInfo {
    address lister;
    ListingState state;
    string[] keywords;
    string adLink;
    uint256 watchCount;
    uint256 watchCountAchieved;
    uint256 priceLocked;
    uint256 spentValue;
    mapping(string => mapping(Gender => uint256)) keywordToGenderToWatchCount;
}

struct ReturnListingInfo {
    address lister;
    uint state;
    string[] keywords;
    string adLink;
    uint256 watchCount;
    uint256 watchCountAchieved;
    uint256 priceLocked;
    uint256 spentValue;
    string[] mappingKeywords;
    uint[] mappingGenderEnums;
    uint256[] mappingWatchCount; 
}

modifier notPaused {
      require(contractPaused == false, "Contract is Paused");
      _;
   }

modifier onlyOwner {
      require(msg.sender == owner, "Only Owner");
      _;
    }

modifier onlyOwnerOrOperator() {
        require(owner == msg.sender || operator == msg.sender, "Only Owner or Operator allowed");
        _;
    }

address public owner;
bool public contractPaused;
address public operator;
uint256 public listingNum;
uint256 private withdrawableFunds;

uint256 public constant PRICE_PER_WATCH = 60e18;

constructor() {
    owner = msg.sender;
    contractPaused = false;
}

mapping(address => ListerInfo) private listerIDtoInfo;

mapping(address => userInfo) private userIDtoInfo;

mapping(string => address[]) private keywordToUserIDs;

mapping(uint256 => ListingInfo) private listingIDtoInfo;

mapping(string => uint256) private keywordToPrice;

string[] public regKeywords;



    function add_listing(string memory name, string memory adLink, string[] memory keywords, uint256 watchCount) external payable notPaused {
        listingIDtoInfo[listingNum].lister = msg.sender;
        listingIDtoInfo[listingNum].state = ListingState.START;
        listingIDtoInfo[listingNum].keywords = keywords;
        listingIDtoInfo[listingNum].adLink = adLink;
        listingIDtoInfo[listingNum].watchCount = watchCount;
        listingIDtoInfo[listingNum].priceLocked = this.calculate_price(keywords, watchCount);
        listerIDtoInfo[msg.sender].listingID.push(listingNum);
        listerIDtoInfo[msg.sender].listingName.push(name);
        require(msg.value >= this.calculate_price(keywords, watchCount), "Not enough balance");
        listingNum++;


    }

    function add_user_info(string[] memory keywords, uint gender, address user) external onlyOwnerOrOperator notPaused {
        if(gender == 0) {
            userIDtoInfo[user] = userInfo(keywords, Gender.MALE);
        }
        else userIDtoInfo[user] = userInfo(keywords, Gender.FEMALE);

        for(uint256 i = 0; i<keywords.length; i++) {
            keywordToUserIDs[keywords[i]].push(user);
            add_keyword_if_new(keywords[i]);
        }
    }

    function watch_ad(uint256 listingID) external notPaused returns(string memory) {
        require(listingIDtoInfo[listingID].state == ListingState.START, "Ad campaign over");
        bool watched = false;
        uint256 maxPrice;
        for(uint256 i = 0; i < listingIDtoInfo[listingID].keywords.length; i++) {
            if(arrayContainsString(userIDtoInfo[msg.sender].keywords, listingIDtoInfo[listingID].keywords[i])) {
                watched = true;
                if(maxPrice < keywordToPrice[listingIDtoInfo[listingID].keywords[i]])
                maxPrice = keywordToPrice[listingIDtoInfo[listingID].keywords[i]];
                listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][userIDtoInfo[msg.sender].gender]++;
            }
        }

        require(watched, "You were not targetted for this ad");
        listingIDtoInfo[listingID].watchCountAchieved++;
        listingIDtoInfo[listingID].spentValue+=maxPrice;
        withdrawableFunds+=maxPrice;
        check_if_state_ended(listingID);
        return listingIDtoInfo[listingID].adLink;
    }

    function withdraw_listing(string memory listingName) external notPaused {
        uint256 listingID = find_listing_id(listingName, msg.sender);
        require(listingIDtoInfo[listingID].state != ListingState.WITHDRAWN, "Already withdrawn");
        listingIDtoInfo[listingID].state = ListingState.WITHDRAWN;
        uint256 withdrawAmount = listingIDtoInfo[listingID].priceLocked - listingIDtoInfo[listingID].spentValue;
        (bool success, bytes memory returnData) = payable(msg.sender).call{
                value: withdrawAmount
            }("");
        require(success, string(returnData));

    }

    function add_keyword_if_new(string memory keyword) internal {
        if(keywordToPrice[keyword] == 0){
            keywordToPrice[keyword] = PRICE_PER_WATCH + (uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, keyword)))%PRICE_PER_WATCH);
            regKeywords.push(keyword);
        }
    }

    function check_if_state_ended(uint256 listingID) internal {
        uint256 maxPrice;
        for(uint256 i = 0; i < listingIDtoInfo[listingID].keywords.length; i++) {
            if(maxPrice < keywordToPrice[listingIDtoInfo[listingID].keywords[i]])
            maxPrice = keywordToPrice[listingIDtoInfo[listingID].keywords[i]];
        }
        if(listingIDtoInfo[listingID].priceLocked - listingIDtoInfo[listingID].spentValue < maxPrice) {
            listingIDtoInfo[listingID].state = ListingState.END;
        }
    }

    function view_listing_analytics(string memory listingName) external view returns(ReturnListingInfo memory) {
        uint256 listingID = find_listing_id(listingName, msg.sender);
        uint256 calculateMappingLength;
        for(uint256 i = 0; i<listingIDtoInfo[listingID].keywords.length; i++) {
            if(listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.MALE] > 0)
            calculateMappingLength++;
            if(listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.FEMALE] > 0)
            calculateMappingLength++;
        }
        string[] memory mappingKeywords = new string[](calculateMappingLength);
        uint[] memory mappingGenderEnums = new uint[](calculateMappingLength);
        uint256[] memory mappingWatchCount = new uint256[](calculateMappingLength);

        uint256 index;

        for(uint256 i = 0; i<listingIDtoInfo[listingID].keywords.length; i++) {
            if(listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.MALE] > 0) {
                mappingKeywords[index] = listingIDtoInfo[listingID].keywords[i];
                mappingGenderEnums[index] = uint(Gender.MALE);
                mappingWatchCount[index] = listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.MALE];
                index++;
            }
    
            if(listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.FEMALE] > 0) {
                mappingKeywords[index] = listingIDtoInfo[listingID].keywords[i];
                mappingGenderEnums[index] = uint(Gender.FEMALE);
                mappingWatchCount[index] = listingIDtoInfo[listingID].keywordToGenderToWatchCount[listingIDtoInfo[listingID].keywords[i]][Gender.FEMALE];
                index++;
            }
        }

        ReturnListingInfo memory returnValue = ReturnListingInfo(
            listingIDtoInfo[listingID].lister,
            uint(listingIDtoInfo[listingID].state),
            listingIDtoInfo[listingID].keywords,
            listingIDtoInfo[listingID].adLink,
            listingIDtoInfo[listingID].watchCount,
            listingIDtoInfo[listingID].watchCountAchieved,
            listingIDtoInfo[listingID].priceLocked,
            listingIDtoInfo[listingID].spentValue,
            mappingKeywords,
            mappingGenderEnums,
            mappingWatchCount
        );

        return returnValue;

    }

    function calculate_price(string[] memory keywords, uint256 watchCount) external view returns(uint256) {
        uint256 maxPrice;
        for(uint256 i = 0; i < keywords.length; i++) {
            if(maxPrice < keywordToPrice[keywords[i]])
            maxPrice = keywordToPrice[keywords[i]];
        }
        return maxPrice*watchCount;
    }

    function view_keywords() external view returns(string[] memory) {
        return regKeywords;
    }

    function view_listing_names() external view returns(string[] memory) {
        return listerIDtoInfo[msg.sender].listingName;
    }

    function find_listing_id(string memory listingName, address lister) internal view returns(uint256) {
        bool found = false;
        uint256 index;
        for (uint256 i = 0; i < listerIDtoInfo[lister].listingName.length; i++) {
            if (StringCompare(listerIDtoInfo[lister].listingName[i], listingName)) {
                found = true;
                index = i;
                break;
            }
        }

        require(found, "listingName not present in your listings");
        return listerIDtoInfo[lister].listingID[index];

    }


    function StringCompare(string memory a, string memory b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function withdrawFunds() external onlyOwner {
        uint256 getfunds = withdrawableFunds;
        withdrawableFunds = 0;
        (bool success, bytes memory returnData) = payable(owner).call{
                value: getfunds
            }("");
        require(success, string(returnData));
    }

    function togglePause() external onlyOwner {
        contractPaused = !contractPaused;
    }

    function setOperator(address _operator) external onlyOwner {
        operator = _operator;
    }

    function arrayContainsString(string[] memory _list, string memory _value) internal pure returns(bool) {
        for (uint256 i = 0; i < _list.length; i++) {
            if (StringCompare(_list[i], _value)) {
                return true;
            }
        }
        return false;
    }

}
