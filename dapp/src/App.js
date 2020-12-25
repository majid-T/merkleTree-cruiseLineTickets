import './App.css';
import CruiseMerkle from "./contract/CruiseMerkle.json";
import Web3 from 'web3';
import {useEffect,useState} from 'react'


function App() {
  const [contract,setContract] = useState();
  const [account,setAccount] = useState();
  const [loading,setLoading]=useState(true)
  const [merkleRoot,setMerkleRoot]=useState('')

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

      const userAccount = await window.web3.eth.getAccounts();
      setAccount(userAccount);

      // Geting the contract
    const contractNetworkData = await CruiseMerkle.networks[networkId];

    if (contractNetworkData) {
      const merkleContract = await new window.web3.eth.Contract(CruiseMerkle.abi, contractNetworkData.address);
      setContract(merkleContract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
    
  }


  const loadBlockchainData = async ()=>{

      //setting network to connect to wallet provide - here is BSC
      await loadWeb3();

      // load contract and address from the wallet
      await loadContractAndAddress();
      
      setLoading(false)

    //Test cotract by calling a view method
    const merkleRoot = await contract.methods.lineMerkleRoot().call();
    setMerkleRoot(merkleRoot)
  }


  useEffect(() => {
      loadBlockchainData()
  }, [loading]);


  return (
    <div className="App">
      {!loading && (
        <div className="container">
          <h1>BSC Test Net</h1>
          <h4>Contract Address: {contract._address}</h4>
          <h4>Connected Account: {account}</h4>
          <h4>Contract Merkle Root: {merkleRoot}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
