# merkleTree-cruiseLineTickets

Use of Merkle tree / Merkle root to validate passengers tickets
Student project by : Majid Shockoohi
Student ID: 101284289

## Description

This project will use Merkle Tree and Merkle root to validate passangers who has bought cruise line tickets.

Every Cruise ship has an average 3000 passangers where each passanger may have multiple information starting from Name and Last name to loyalty numbers or cruise line specific info. It won't be possible to store all of this data on-chain.

Each passanger will present its Proof as a ticket and the software will use Merkle Tree to decide if the ticket is valid or not. For this MVP, we will be using a customize data set of Titanic passangers. We will add some data and hash all information on each passanger into a single hash to be part of our Merkle tree.

## Implementation details

In the data folder we have a txt file tickets.txt and ticket-hashes.txt which is hash of every ticket. Hashing was performed by a hashTickets.js in data folder. Merkle Root and Proofs are prodcued by merkleProducer.js which is a modified version of a .js file we had on a vote-merkle lab.
Merkle root here should be root: 0xcd18608fe9a0ddde7241a5c46407f3bafd9193e382c9baf11462d2acc4497ce7

## Gas cost optimizations

TBD

## Security considerations

TBD

## Future Development

If future ticket sale can be done by separate smart contract it self by ether payment. Function ticketSale can take multiple string values just like our example, accept payment and issue ticket. A hash can be emitted and returned to customer as proof. THe hash can be retrvied by another DAPP and be included in a ticket list. On sale finish, Merkle root can be produced and this contract can be deployed to act as check-in utility.
