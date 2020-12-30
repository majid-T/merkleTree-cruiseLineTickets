import { configureStore } from "@reduxjs/toolkit";
import contractReducer from "../features/contractSlice";

export default configureStore({
  reducer: {
    contract: contractReducer,
  },
});
