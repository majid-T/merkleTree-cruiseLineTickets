import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    networkId: 10,
  },

  reducers: {
    setNetworkId: (state, id) => {
      state.networkId = id;
    },
  },
});

export const { setNetworkId } = contractSlice.actions;

export const selectNetworkId = (state) => state.contract.networkId;

export default contractSlice.reducer;
