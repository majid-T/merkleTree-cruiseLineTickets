# merkleTree-cruiseLineTickets

Use of Merkle tree / Merkle root to validate passengers tickets
Student project by : Majid Shockoohi
Student ID: 101284289

## Description

This project will use Merkle Tree and Merkle root to validate passangers who how bought cruise line tickets.

Every Cruise ship has an average 3000 passangers where each passanger may have multiple information starting from Name and Last name to loyalty numbers or cruise line specific info. It won't be possible to store all of this data on-chain.

Each passanger will present its Proof as a ticket and the software will use Merkle Tree to decide if the ticket is valid or not. For this MVP we are assuming tickets where bought using Ethereum accounts. sOnly address of each ticket holder is hashedd and added to the tree, so it would be available to perform testing.

## Implementation details

TBD

## Gas cost optimizations

TBD

## Security considerations

TBD

## anything else you think is relevant.

TBD
