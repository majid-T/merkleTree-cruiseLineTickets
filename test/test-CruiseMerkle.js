// Contract solidity code
const CruiseMerkle = artifacts.require("CruiseMerkle.sol");
// Test Root for now
const voyageMerkleRoot =
  "0xcd18608fe9a0ddde7241a5c46407f3bafd9193e382c9baf11462d2acc4497ce7";

// Contract test Begin
contract("Cruise Merke Tree:", (accounts) => {
  let contractInstance;

  //  [Before]: deployment of the contract and geting the instance
  before(() => {
    return CruiseMerkle.deployed(voyageMerkleRoot).then((instance) => {
      contractInstance = instance;
    });
  });

  //  [Deployment] - Testing for deployment of the contract
  it("Contract is deployed successfuly", async () => {
    assert.equal(
      contractInstance.address.length,
      42,
      `Incorrent address length - length is ${contractInstance.address.length}`
    );
    assert.ok(contractInstance.address, "Contract not deployed..!!");
  });

  it("Contract is deployed with correct Merkle Root ", async () => {
    const lineMerkleRootGetResult = await contractInstance.lineMerkleRoot();
    assert.equal(
      lineMerkleRootGetResult.length,
      66,
      "Received 'registeredUsersMerkleRoot' is not of bytes32 - 32*2+0x=66"
    );
    assert.equal(
      lineMerkleRootGetResult,
      voyageMerkleRoot,
      "Deployed Merkle root is not what expected"
    );
  });
});
