// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Faucet {
    struct AccountInfo {
        string name;
        uint age;
        //string sex;
        //ngày sinh
        //số điện thoại
        //email
        //hash
    }

    mapping(address => AccountInfo) public accounts;

    function setAccountInfo(string memory _name, uint _age) public {
        accounts[msg.sender] = AccountInfo(_name, _age);
    }

    function getAccountInfo() public view returns (string memory, uint) {
        return (accounts[msg.sender].name, accounts[msg.sender].age);
    }
}
