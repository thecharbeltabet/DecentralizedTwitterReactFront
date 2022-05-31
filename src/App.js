import React from "react";
import Sidebar from "./Components/Sidebar";
import Grid from "@material-ui/core/Grid";
import ReactRoundedImage from "react-rounded-image";
import Button from "@material-ui/core/Button";
import Main from "./Components/Main";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log(chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("Not connected to the Rinkeby Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:" + chainId);

    const rinkebyChainId = "0x4";

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  });

  return (
    <div>
      {currentAccount === "" ? (
        <div>
          <Grid container justify="center">
            <ReactRoundedImage
              image={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
              }
              roundedColor="#321124"
              imageWidth="400"
              imageHeight="400"
              roundedSize="13"
              borderRadius="70"
            />
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={connectWallet}
            >
              Connect to your Metamask Wallet{" "}
            </Button>
          </Grid>
        </div>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Main />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the Rinkeby Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </div>
  );
}

export default App;
