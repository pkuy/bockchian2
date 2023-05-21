// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Faucet {
    struct AccountInfo {
        string name;
        uint age;
        string sign;
        string publicKey;
    }

    mapping(address => AccountInfo) public accounts;

    function setAccountInfo(string memory _name, uint _age, string memory _sign,string memory _publickey) public {
        accounts[msg.sender] = AccountInfo(_name, _age, _sign, _publickey);
    }

    function getAccountInfo() public view returns (string memory, uint, string memory,string memory) {
        return (accounts[msg.sender].name, accounts[msg.sender].age, accounts[msg.sender].sign, accounts[msg.sender].publicKey);
    }
}
