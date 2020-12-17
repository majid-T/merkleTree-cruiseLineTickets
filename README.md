# merkleTree-cruiseLineTickets

- Use of Merkle tree / Merkle root to validate passengers tickets

## Description

This project will use Merkle Tree and Merkle root to validate passangers who has bought cruise line tickets.

Every Cruise ship has an average 3000 passangers where each passanger may have multiple information starting from Name and Last name to loyalty numbers or cruise line specific info. It won't be possible to store all of this data on-chain.

Each passanger will present its Proof as a ticket and the software will use Merkle Tree to decide if the ticket is valid or not. For this MVP, we will be using a customize data set of Titanic passangers. We will add some data and hash all information on each passanger into a single hash to be part of our Merkle tree.

## Implementation details

In the data folder we have a txt file tickets.txt and ticket-hashes.txt which is hash of every ticket. Hashing was performed by a hashTickets.js in data folder. Merkle Root and Proofs are prodcued by merkleProducer.js which is a modified version of a .js file we had on a vote-merkle lab.
Merkle root here should be root: 0xcd18608fe9a0ddde7241a5c46407f3bafd9193e382c9baf11462d2acc4497ce7

This contract will be useful for boarding passangers, and later on (Since we know what happend to Titanic) by insurance companies or any third party to validate any ticket hash brought to their platform. Users of contract could be but not limited to: Payment systems, Cruise Line Company, Customer Service, Maritime Authorities, Certification Aithorities, Passangers, Third Party API development, Port Authorities,...

![BizPlan](/docs/bizPlan.png)

=== Contract Functions ===

| Function      | Input                                                                 | output                      | Description                                                   | access         |
| ------------- | --------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------- | -------------- |
| constructor   | address \_lineMerkleRoot                                              | N/A                         | Deploy the contract with root and assigns owner to msg.sender | public         |
| giveAccess    | address \_adress, bool \_access                                       | none                        | Modifiy access to contract by third party                     | public         |
| hashForLeaf   | bytes32 \_leaf                                                        | bytes32                     | Hesh for leaf ticket                                          | private - pure |
| hashForNode   | bytes32 \_left, bytes32 \_right                                       | bytes32                     | Hash for nodes in tree                                        | private - pure |
| isValidTicket | uint256 \_path, bytes32[] memory \_witnesseList, bytes32 \_ticketHash | Chechs if a ticket is valid | public - view                                                 |

## Gas cost optimizations

- Avoided the determination of modifier and used inline check for require checkings since its only used once in function calls
- hashForLeaf & hashForNode functions were declared pure since they don't modify the state.
- By storing a Merkle Root hash instead of all ticket hashs, significant amount of storage gas is saved

## Security considerations

- byte32 Merkle root and address owner were positioned on slots 0 and 1 to occupy only needed storge
- Use of public state variables to use explicit getters function instead of decalring one
- Smart Contract followed KISS design principle. Keep it simple Stupid targets the use of the technology for it core purpose, and here we needed a blockchain as immutable public distributed ledger to keep Merkle Root of tickets. All other functionalitis can be done off-chain.
- hashForLeaf & hashForNode functions were declared private so only this contract can access them
- Contract sets deployer as owner to limit access to contract for owner only

## Future Development

If future ticket sale can be done by separate smart contract it self by ether payment. Function ticketSale can take multiple string values just like our example, accept payment and issue ticket. A hash can be emitted and returned to customer as proof. THe hash can be retrvied by another DAPP and be included in a ticket list. On sale finish, Merkle root can be produced and this contract can be deployed to act as check-in utility.

### Testing

Tests are performed on the contract using truffle and below are the results

![tests](/docs/tests.png)

### How to Deploy

1. Clone this project
1. cd to the directory
1. npm install to get packages
1. run truffle test to see test cases and their results
1. run npx truffle develop to run a local blockchain copy
1. in truffle cli type migrate to deploy locally

### Rinkeby deploy

#### Address on Rinkeby

0xa868b2855885e2915069adbbeddf4566083aa00f

1. run truffle migrate --network rinkeby to deploy to rinkeby }

### BSC deploy

#### Address on BSC

0x04501e4f31380e7d1e727de42e5c9544f5d3fbe8

1. run npx truffle migrate --network testnet
