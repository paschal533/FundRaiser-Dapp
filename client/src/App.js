import React, { useEffect, useState } from "react";
import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const [state, setState] = useState({
    web3: null, accounts: null, contract: null
  });
  const [storageValue, setStorageValue] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setState({web3, accounts, contract: instance});
      } catch(error) {
        console.log("failed to load web3", error);
      }
    }
    init();
  }, []);

  const runExample = async () => {
    const { accounts, contract } = state;
  };

  return(
    <div>
      <h1>Fundraiser</h1>
    </div>
  )
}

export default App;