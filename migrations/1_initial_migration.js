const obscure_lock = artifacts.require("obscure_lock");

module.exports = function(deployer) {
  deployer.deploy(obscure_lock);
};
