const CruiseMerkle = artifacts.require("CruiseMerkle");
const voyageMerkleRoot =
  "0xcd18608fe9a0ddde7241a5c46407f3bafd9193e382c9baf11462d2acc4497ce7";

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(CruiseMerkle, voyageMerkleRoot);
  });
};
