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

  //  [Deployment] - Testing for deployment to be done with desired Merke Root
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

  //  [Functionality] - Testing for isValidTicket function to return true on path at the begining of the tree and even placing
  it("Funciton isValidTicket return true for correct ticket hash on 0 path (Far left of the tree | even path)", async () => {
    const ticketHash =
      "0xbf5b9f750371c15109ef14dd017581a89332cdf92c765db7259370d93fb551dd";

    const path = 0;
    const witnesses = [
      "0x6827a8cec3caa555942d3275196e4efe6386550e38895e216d65d895018f39a0",
      "0x6efaf8b5e9cfc0705c7ece9bc1d4195ddb4adfb9f8ad970b20041c42703f7e2a",
      "0x70782ba13ba2cec020d306ec385771e2948e35abaf658fa76e2c2ee7e68c9297",
      "0x0a576c6af156284a87c8f7ac7cf6d34ab2b9f54b1847001aebbd1afcc64cf2b2",
      "0x57901315d25c4ecf8680e4c88674de8c7250126c0c65bb19072513a27d7e0057",
      "0x9b71ae4af25dca13e6cb244ff9bae76b1e66a173c85b2a383fdcecbd94bdf1f0",
      "0x9059b26ce80f54d31a0abe6b41080beda2ba7e2bc9ecf0457fdb16838430e002",
      "0xed6d8ffe76f807fea6f499f1aa7003001112f448d36c730fc8414b50ba6bee99",
      "0x58f8f3a4ea1c3634f6b7127de31d2fa351b4af616265bfb86e4af2588121e67e",
      "0x0e4537ef9ebd8ccd24b5795431fb5a512de2b52239bf20bf901396ef701905ab",
      "0x555001ba1defb443a1602591d8c07a764799313e787718403b87f31988a3169c",
    ];

    const isValidResult = await contractInstance.isValidTicket(
      path,
      witnesses,
      ticketHash
    );

    assert.equal(isValidResult, true, "Valid result didn't return true!");
  });

  //  [Functionality] - Testing for isValidTicket function to return true on path in the middle of the tree and even placing
  it("Funciton isValidTicket return true for correct ticket hash on even path (middle of the tree | even path)", async () => {
    const ticketHash =
      "0x2210c1c11371def4e1f21ec535d2fd1cb5454de41d7445e7fe7b77a4c486ee45";

    const path = 8;
    const witnesses = [
      "0x6eb9c3cd9d6823d14b6a303f2c6d0d7b8dc5d3c329ca39a36a5cd8df44dd03a4",
      "0xda1b3ac0fb2cc7cc0c9046cb1fe196b7479f38e53ec65964d5d77aa2c2eb7a12",
      "0x1146f22585cbab4cde4d038c3c30968682acda20066f5adba52319d9229dd93d",
      "0xdb2f1e882897315d12694444a17be201fa6bfcc628740c8b11b51483e5f96810",
      "0x57901315d25c4ecf8680e4c88674de8c7250126c0c65bb19072513a27d7e0057",
      "0x9b71ae4af25dca13e6cb244ff9bae76b1e66a173c85b2a383fdcecbd94bdf1f0",
      "0x9059b26ce80f54d31a0abe6b41080beda2ba7e2bc9ecf0457fdb16838430e002",
      "0xed6d8ffe76f807fea6f499f1aa7003001112f448d36c730fc8414b50ba6bee99",
      "0x58f8f3a4ea1c3634f6b7127de31d2fa351b4af616265bfb86e4af2588121e67e",
      "0x0e4537ef9ebd8ccd24b5795431fb5a512de2b52239bf20bf901396ef701905ab",
      "0x555001ba1defb443a1602591d8c07a764799313e787718403b87f31988a3169c",
    ];

    const isValidResult = await contractInstance.isValidTicket(
      path,
      witnesses,
      ticketHash
    );

    assert.equal(isValidResult, true, "Valid result didn't return true!");
  });

  //  [Functionality] - Testing for isValidTicket function to return true on path in the middle of the tree and odd placing
  it("Funciton isValidTicket return true for correct ticket hash on odd path (middle of the tree | odd path)", async () => {
    const ticketHash =
      "0xa78bd0e68c2952811d195870b0c3e58f36016f7d0ac74ace5a9e6557f6710d65";

    const path = 29;
    const witnesses = [
      "0xde125a623a99357420aca524b539247ff940db9b4f2bd2bf19e55e1986836f02",
      "0xad676007afed258e283cae76ecc46e0bcd92d044945d19ae93ffba48d2055498",
      "0xe9f59e1887fdaf33073781e01b293dc9721c34d8f1d45837d68154d5e74f1fed",
      "0xcf460d2cb591ef5995daffdf2b75f1f283bc6b81c89fdd4162b3759133377809",
      "0x5f38b2eedc97786c5ce0e0cc06f69beababf2c48b5009852d818190c2ca3fd44",
      "0x9b71ae4af25dca13e6cb244ff9bae76b1e66a173c85b2a383fdcecbd94bdf1f0",
      "0x9059b26ce80f54d31a0abe6b41080beda2ba7e2bc9ecf0457fdb16838430e002",
      "0xed6d8ffe76f807fea6f499f1aa7003001112f448d36c730fc8414b50ba6bee99",
      "0x58f8f3a4ea1c3634f6b7127de31d2fa351b4af616265bfb86e4af2588121e67e",
      "0x0e4537ef9ebd8ccd24b5795431fb5a512de2b52239bf20bf901396ef701905ab",
      "0x555001ba1defb443a1602591d8c07a764799313e787718403b87f31988a3169c",
    ];

    const isValidResult = await contractInstance.isValidTicket(
      path,
      witnesses,
      ticketHash
    );

    assert.equal(isValidResult, true, "Valid result didn't return true!");
  });

  //  [Functionality] - Testing for isValidTicket function to return true onfar right of the tree and odd placing
  it("Funciton isValidTicket return true for correct ticket hash on odd path 1023 (far right of the tree | odd path)", async () => {
    const ticketHash =
      "0x7493d5e512c7370661ed4a5dab94a5c9ee9b741eb2c3cf34c5ff9a63f4dbe6b0";

    const path = 1023;
    const witnesses = [
      "0x9bea3d39a90a2f41c1ae335422d55018fe686b3f790788767a29ddad7eba4604",
      "0xf53fb14e9f9b35f7aa34f1427f73396e532fa13071ce467b87dd20155a9d02d6",
      "0x2666d41bb507a90b35786c3449218682e2e2061606da92345ce4ffcf9d810467",
      "0x194d23c1d4333fa7edfea8ffcb93651b8f7d5324a8c22d5350dee8acfe5812d4",
      "0x07c32a447d9c1b535b6b1a91cce9b24136d89fbf44f8d8350c1fa93df2399ec6",
      "0xd89c335ed79ff14fe28dda4c803d514ce7140b991e7aa5b130319131fedad343",
      "0x27a865cc9621c8f7e2fad2c75b4f11b558278db101a203a7c63c8cd1d1d6dd6c",
      "0x334533d454fa43b6871d3ad69fc5fa33a3806c09eba0f9409d057fd558e5aae4",
      "0x66b15a2770c4dd923ac5433e98badae9073d97d73ef189957029b8c751eb9363",
      "0xaf33e0af6e5cb86d3dfc7ccb07b1dd1763fc0472dc42fdd4c04f1113fe30f618",
      "0x555001ba1defb443a1602591d8c07a764799313e787718403b87f31988a3169c",
    ];

    const isValidResult = await contractInstance.isValidTicket(
      path,
      witnesses,
      ticketHash
    );

    assert.equal(isValidResult, true, "Valid result didn't return true!");
  });
});
