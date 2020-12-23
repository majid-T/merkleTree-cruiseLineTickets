import './App.css';
import CruiseMerkle from "./contract/CruiseMerkle.json";
import Web3 from 'web3';


function App() {
  let contract;
  let account;

  const loadWeb3 = async ()=>{
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }else if(window.web3){
        window.web3 = new Web3(window.web3.currnetProvider)
      }else{
        window.alert("None Ethereum borswer - please use Meta mask or other wallet of your choice")
      }
  }

  const loadContractAndAddress = async ()=>{
      const networkId = await window.web3.eth.net.getId();

      account = await window.web3.eth.getAccounts();

      // Geting the contract
    const contractNetworkData = await CruiseMerkle.networks[networkId];

    if (contractNetworkData) {
      contract = await new window.web3.eth.Contract(CruiseMerkle.abi, contractNetworkData.address);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }


  const loadBlockchainData3 = async ()=>{

      //setting network to connect to wallet provide - here is BSC
      await loadWeb3();

      // load contract and address from the wallet
      await loadContractAndAddress();
      
      // console.log(account)

    //Test cotract by calling a view method
    const deployedMerkleRoot = await contract.methods.lineMerkleRoot().call();
    console.log(deployedMerkleRoot)
  }

  loadBlockchainData3();
  return (
    <div className="App">
      <h1>BSC Test Net</h1>
    </div>
  );
}

export default App;
