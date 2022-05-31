/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Main.css";
import FlipMove from "react-flip-move";
import { TwitterContractAddress } from "../config";
import { ethers } from "ethers";
import Twitter from "../addedback/BackendContract.json";

function Main({ personal }) {
  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].walletID.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isRemoved: allTweets[i].isRemoved,
          walletID: allTweets[i].walletID,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isRemoved: allTweets[i].isRemoved,
          walletID: allTweets[i].walletID,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getAllTweets = async () => {
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

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
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

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="main__header">
        <h2>Welcome to C&A's Decentralized version of twitter </h2>
        <h6>C&A = Charbel and Anthony</h6>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.walletID}
            text={post.tweetText}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Main;
