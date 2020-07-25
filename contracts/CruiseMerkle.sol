// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract CruiseMerkle {
    // Merkle root of the line, will get assigned on constructor
    bytes32 public lineMerkleRoot;

    //Contract constructor, gets merkle root and assigns it state variable
    constructor(bytes32 _lineMerkleRoot) public {
        lineMerkleRoot = _lineMerkleRoot;
    }

    /// @notice Calculates the leaf Hash of the user address
    /// @param _leaf Address of the user
    /// @return bytes32 leaf Hash of the user address
    function hashForLeaf(address _leaf) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(uint8(0x00), _leaf));
    }

    /// @notice Calculates the node Hash of the user address
    /// @param _left Address or Witness of the user (decided by '0x00 and 0x01')
    /// @param _right Witness or address of the user (decided by '0x01 and 0x00')
    /// @return bytes32 Node Hash of the user
    function hashForNode(bytes32 _left, bytes32 _right)
        private
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(uint8(0x01), _left, _right));
    }

    /// @notice Generate a hash root base of input info
    /// @param  _path Path (Index) for the issued ticket address
    /// @param  _witnesseList Witnesses for issued ticket address
    /// @param _inputAddress Address of the passanger who bought the ticket
    /// @return  bytes32 Calculated root based on inpt data
    function getRootForInput(
        uint256 _path,
        bytes32[] memory _witnesseList,
        address _inputAddress
    ) private pure returns (bytes32) {
        uint256 path = _path;
        bytes32[] memory witnesses = _witnesseList;
        address inputAddress = _inputAddress;
        bytes32 ticketRoot = hashForLeaf(inputAddress); //  Calculates the leaf Hash of the passanger address
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
        return ticketRoot;
    }
}
