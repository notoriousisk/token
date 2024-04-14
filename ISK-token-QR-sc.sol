// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ISKToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ISK", "ISK") {
        _mint(msg.sender, initialSupply);
    }
    

    struct TransferToken {
        address sender;
        uint256 amount;
        uint256 recipientsNumber;
        uint256 numberLeft;
    }

    mapping(string => TransferToken) public transfers;
    mapping(address => string[]) public userTransfers;
    mapping(string => string) private passwordMapping;
    mapping(address => string[]) private userCollected;

    string LastCheque;
    function getLastCheque() external view returns (string memory){
        return LastCheque;
    }

    function sendTokens(uint256 amount, uint256 recipientsNumber, string memory password) external returns (string memory) {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        string memory uniqueString = generateUniqueString();
        transfers[uniqueString] = TransferToken(msg.sender, amount, recipientsNumber, recipientsNumber);
        userTransfers[msg.sender].push(uniqueString);
        passwordMapping[uniqueString] = password;

        _transfer(msg.sender, address(this), amount);

        LastCheque = uniqueString;

        return uniqueString;
    }

    function receiveTokens(string memory uniqueString, string memory password) external returns (uint256){
        require(transfers[uniqueString].numberLeft != 0, "Tokens already collected");

        string memory storedPassword = passwordMapping[uniqueString];
        require(keccak256(abi.encodePacked(storedPassword)) == keccak256(abi.encodePacked(password)), "Incorrect password!");
        // require(userCollected[]);

        TransferToken storage transfer = transfers[uniqueString];
        transfer.numberLeft -= 1;

        uint256 amountToRecieve = transfer.amount / transfer.recipientsNumber;

        _transfer(address(this), msg.sender, amountToRecieve);

        return amountToRecieve;
    }

    function cancelTransfer(string memory uniqueString) external {
        require(transfers[uniqueString].sender == msg.sender, "You are not the sender");
        require(transfers[uniqueString].numberLeft != 0, "Tokens already collected");

        TransferToken storage transfer = transfers[uniqueString];

        uint256 amountToRecieve = (transfer.amount / transfer.recipientsNumber) * transfer.numberLeft;

        _transfer(address(this), transfer.sender, amountToRecieve);


        transfer.numberLeft = 0;
    }

    function getTransferDetails(string memory uniqueString) external view returns (uint256, uint256, uint256) {
        TransferToken memory transfer = transfers[uniqueString];
        return (transfer.amount, transfer.recipientsNumber, transfer.numberLeft);
    }

    function getUserTransfers() external view returns (string[] memory) {
        return userTransfers[msg.sender];
    }

    function generateUniqueString() private view returns (string memory) {
        // return string(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender));
        return toHex(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
    }

    // https://stackoverflow.com/questions/67893318/solidity-how-to-represent-bytes32-as-string
    function toHex16 (bytes16 data) internal pure returns (bytes32 result) {
        result = bytes32 (data) & 0xFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000 |
            (bytes32 (data) & 0x0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000) >> 64;
        result = result & 0xFFFFFFFF000000000000000000000000FFFFFFFF000000000000000000000000 |
            (result & 0x00000000FFFFFFFF000000000000000000000000FFFFFFFF0000000000000000) >> 32;
        result = result & 0xFFFF000000000000FFFF000000000000FFFF000000000000FFFF000000000000 |
            (result & 0x0000FFFF000000000000FFFF000000000000FFFF000000000000FFFF00000000) >> 16;
        result = result & 0xFF000000FF000000FF000000FF000000FF000000FF000000FF000000FF000000 |
            (result & 0x00FF000000FF000000FF000000FF000000FF000000FF000000FF000000FF0000) >> 8;
        result = (result & 0xF000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000) >> 4 |
            (result & 0x0F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F00) >> 8;
        result = bytes32 (0x3030303030303030303030303030303030303030303030303030303030303030 +
            uint256 (result) +
            (uint256 (result) + 0x0606060606060606060606060606060606060606060606060606060606060606 >> 4 &
            0x0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F) * 7);
    }

    function toHex (bytes32 data) public pure returns (string memory) {
            return string (abi.encodePacked ("0x", toHex16 (bytes16 (data)), toHex16 (bytes16 (data << 128))));
    }

    
}
