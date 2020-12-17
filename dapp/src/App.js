import './App.css';
import CruiseMerkle from "./contract/CruiseMerkle.json";
import Web3 from 'web3';

function App() {
  const port = 8545;
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:" + port);

  let contract;
  const allAccounts = [];

  const loadBlockchainData = async () => {
    // Check network Id
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    //Setting all accounts
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts)

    // Geting the contract
    const networkData = CruiseMerkle.networks[networkId];

    if (networkData) {
      const abi = CruiseMerkle.abi;
      const address = "0x04501e4f31380e7d1e727de42e5c9544f5d3fbe8";
      contract = await new web3.eth.Contract(abi, address);
      console.log(contract.methods)
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  loadBlockchainData();
  return (
    <div className="App">
      <h1>BSC Test Net</h1>
    </div>
  );
}

export default App;
