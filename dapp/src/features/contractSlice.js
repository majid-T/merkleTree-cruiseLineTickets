import { createSlice } from "@reduxjs/toolkit";
import CruiseMerkle from "../contract/CruiseMerkle.json";
import Web3 from "web3";

let contract = null;
export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    networkId: "",
    userAccount: "",
    lineMerkleRoot: "",
    contractAddress: "",
  },

  reducers: {
    setLineMerkleRoot: (state, action) => {
      state.lineMerkleRoot = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setUserAccount: (state, action) => {
      state.userAccount = action.payload;
    },
    setContractAddress: (state, action) => {
      state.contractAddress = action.payload;
    },
  },
});

export const {
  setLineMerkleRoot,
  setNetworkId,
  setUserAccount,
  setContractAddress,
} = contractSlice.actions;

//Async function to set blokchain Data
export const setBlockchainDataAsync = () => async (dispatch) => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currnetProvider);
  } else {
    window.alert(
      "None Ethereum borswer - please use Meta mask or other wallet of your choice"
    );
  }

  const netId = await window.web3.eth.net.getId();
  dispatch(setNetworkId(netId));

  const userAccount = await window.web3.eth.getAccounts();
  dispatch(setUserAccount(userAccount));

  //   Geting the contract
  const contractNetworkData = await CruiseMerkle.networks[netId];

  if (contractNetworkData) {
    const merkleContract = await new window.web3.eth.Contract(
      CruiseMerkle.abi,
      contractNetworkData.address
    );

    dispatch(setContractAddress(merkleContract._address));
    contract = merkleContract;

    dispatch(setLineMerkleRoot(await contract.methods.lineMerkleRoot().call()));
  } else {
    window.alert("Smart contract not deployed to detected network.");
  }
};

//selectors
export const selectNetworkId = (state) => state.contract.networkId;
export const selectUserAccount = (state) => state.contract.userAccount;
export const selectLineMerkleRoot = (state) => state.contract.lineMerkleRoot;
export const selectContractAddress = (state) => state.contract.contractAddress;

export default contractSlice.reducer;
