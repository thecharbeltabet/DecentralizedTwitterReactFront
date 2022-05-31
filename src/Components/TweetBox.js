import React, { useState } from "react";
import "./TweetBox.css";
import ReactRoundedImage from "react-rounded-image";
import { Button } from "@material-ui/core";
import { TwitterContractAddress } from "../config.js";
import { ethers } from "ethers";
import Twitter from "../addedback/BackendContract.json";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");

  const createTweet = async () => {
    let tweet = {
      tweetText: tweetMessage,
      isRemoved: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let twitterTx = await TwitterContract.createTweet(
          tweet.tweetText,
          tweet.isRemoved
        );

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();

    createTweet();

    setTweetMessage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <ReactRoundedImage
            image={"https://cdn-icons-png.flaticon.com/512/147/147144.png"}
            roundedColor="#321124"
            imageWidth="100"
            imageHeight="100"
            roundedSize="13"
            borderRadius="70"
          />
          <input
            className="blabla"
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="Express yourself freely on the blockchain ..."
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Press here to use the magic of the blockchain
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
