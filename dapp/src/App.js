import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNetworkId,
  selectLineMerkleRoot,
  selectUserAccount,
  selectContractAddress,
  setBlockchainDataAsync,
} from "./features/contractSlice";

function App() {
  const networkId = useSelector(selectNetworkId);
  const lineMerkleRoot = useSelector(selectLineMerkleRoot);
  const account = useSelector(selectUserAccount);
  const contractAddress = useSelector(selectContractAddress);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadBlockchainData = async () => {
    dispatch(setBlockchainDataAsync());

    setLoading(false);
  };

  useEffect(() => {
    loadBlockchainData();
  }, [loading]);

  return (
    <div className="App">
      {!loading && (
        <div className="container">
          <h1>BSC Test Net - network Id : {networkId}</h1>
          <h4>Contract Address: {contractAddress}</h4>
          <h4>Connected Account: {account}</h4>
          <h4>Contract Merkle Root: {lineMerkleRoot}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
