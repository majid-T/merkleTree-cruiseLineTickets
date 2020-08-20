// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract CruiseMerkle {
    // Merkle root of the line, will get assigned on constructor
    bytes32 public lineMerkleRoot;
    address public owner;
    mapping(address => bool) public authUsers;

    //Contract constructor, gets merkle root and assigns it state variable
    constructor(bytes32 _lineMerkleRoot) public {
        lineMerkleRoot = _lineMerkleRoot;
        owner = msg.sender;
    }

    /// @notice Gives access to certain addresses by owner
    /// @param _address Address of user we want to give/take access to
    /// @param _access Boolean value determining the access
    function giveAccess(address _address, bool _access) public {
        require(msg.sender == owner, "[CruiseMerkle]: Only owner can call");
        authUsers[_address] = _access;
    }

    /// @notice Calculates the leaf Hash of the ticket
    /// @param _leaf Hash of the ticket
    /// @return bytes32 leaf Hash of the ticket
    function hashForLeaf(bytes32 _leaf) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(uint8(0x00), _leaf));
    }

    /// @notice Calculates the node Hash of the ticket
    /// @param _left Hash or witness of the user (decided by '0x00 and 0x01')
    /// @param _right Witness or hash of the user (decided by '0x01 and 0x00')
    /// @return bytes32 Node Hash of the ticket
    function hashForNode(bytes32 _left, bytes32 _right)
        private
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(uint8(0x01), _left, _right));
    }

    /// @notice Generate a hash root based on input info and compare with state lineROot
    /// @param  _path Path (Index) for the ticket hash in the tree
    /// @param  _witnesseList Witnesses for issued ticket
    /// @param _ticketHash Hash of the ticket info
    /// @return  bytes32 Calculated root based on input data
    function isValidTicket(
        uint256 _path,
        bytes32[] memory _witnesseList,
        bytes32 _ticketHash
    ) public view returns (bool) {
        require(
            authUsers[msg.sender] == true,
            "[CruiseMerkle]: Only authorized user can call this function"
        );
        uint256 path = _path;
        bytes32[] memory witnesses = _witnesseList;
        bytes32 ticketHash = _ticketHash;
        bytes32 ticketRoot = hashForLeaf(ticketHash); //  Calculates the leaf Hash of the passanger ticket
        for (uint16 i = 0; i < witnesses.length; i++) {
            if ((path & 0x01) == 1) {
                //  Calculations based on 0x01 - ticket root is on the right
                ticketRoot = hashForNode(witnesses[i], ticketRoot);
            } else {
                //  Calculations based on 0x00 - ticket root is on the left
                ticketRoot = hashForNode(ticketRoot, witnesses[i]);
            }
            path /= 2;
        }
        return ticketRoot == lineMerkleRoot;
    }
}
