const CruiseMerkle = artifacts.require("CruiseMerkle");
const voyageMerkleRoot =
  "0x1234567890123456789012345678901234567890123456789012345678901234";

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(CruiseMerkle, voyageMerkleRoot);
  });
};
