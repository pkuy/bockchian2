const KeyStorage = artifacts.require("Node1KeyStorage");

module.exports = function (deployer) {
  deployer.deploy(KeyStorage,"0x33C54F781ED445c65448587C5abDdfcC0bc21345");
};