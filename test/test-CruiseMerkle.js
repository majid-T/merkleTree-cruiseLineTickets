// Contract solidity code
const CruiseMerkle = artifacts.require("CruiseMerkle.sol");
// Test Root for now
const voyageMerkleRoot =
  "0x1234567890123456789012345678901234567890123456789012345678901234";

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
});
