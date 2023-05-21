"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import nftABI from "../../abi/nft.json";
import coinABI from "../../abi/coin.json";
import dispenserABI from "../../abi/dispenser.json";

export function CoinBalance({ profAddress }) {
  // state
  const [claimId, setClaimId] = useState(0);
  const [signature, setSignature] = useState("");

  const coinContract = {
    address: process.env.coinAddress,
    abi: coinABI,
  };

  const nftContract = {
    address: process.env.nftAddress,
    abi: nftABI,
  };

  // state
  const [counter, setCounter] = useState(0);

  // wagmi hooks
  const { isConnected, address } = useAccount();
  const { data } = useContractReads({
    contracts: [
      {
        ...coinContract,
        functionName: "balanceOf",
        args: [profAddress],
      },
      {
        ...nftContract,
        functionName: "tokenOfOwnerByIndex",
        args: [profAddress, 0],
      },
    ],
  });
  const { config, status: prepStatus } = usePrepareContractWrite({
    address: process.env.dispenserAddress, // minter address
    abi: dispenserABI,
    functionName: "claimRewards",
    args: [claimId, data[1].result.toString(), counter, signature],
    enabled: claimId > 0 && signature !== "" && counter > 0 ? true : false,
    overrides: {
      from: address,
      gasLimit: 1000000,
    },
  });
  const {
    data: writeData,
    write,
    status: writeStatus,
    reset,
  } = useContractWrite({
    mode: "prepared",
    ...config,
  });
  const { isFetching } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess(data) {
      toastHandler(false, "success");
    },
    onError(error) {
      toastHandler(true, "failed");
    },
  });

  const getClaimableRewards = async () => {
    // call an api get method to get reward amount - the claimedSoFar from smart contract
    // set the counter

    const body = {
      nftId: parseInt(data[1].result.toString()),
      reward: ethers.parseEther(counter.toString()),
    };

    console.log(body);
    const headers = {
      "Content-Type": "application/json", // Example header
    };

    const response = await fetch(
      `${process.env.nftAPI}/add_reward`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      const output = response.json();
      await output.then(data => toastHandler(false, data.message));
    }

    fetchClaimableInfo();
  };

  const fetchClaimableInfo = useCallback(async () => {
    const response = await fetch(
      `${process.env.nftAPI}/get_accumulated_rewards?nftId=${data[1].result.toString()}`
    );
    const output = await response.json();
    const data = JSON.parse(output.item.result);        
    setClaimId(data.claimId);
    setSignature(data.signature);
  }, [])

  const updateClaimableRewardsOfUser = () => {
    // call an api post if the account is not existing
  };

  // toast handler
  const toastHandler = useCallback((isError, message) => {
    if (isError === false) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  useEffect(() => {
    reset();
    prepStatus === "success" && write?.();
  }, [prepStatus]);

  return (
    <div className="mx-2 py-4 rounded bg-white text-black border rounded shadow">
      <div className="flex flex-col flex-wrap px-4">
        <div className="py-5">
          <div className="px-5 border-b border-slate-200 pb-4 mb-4">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
              Coin Details
            </h1>
          </div>
          <div className="flex lg:flex-row flex-col">
            <div className="flex-1">
              <p>Claimable Coins: {counter}</p>
              <p>Coin Balance: {data[0].result.toString()}</p>
            </div>
            <div className="flex-1">
              <a
                className="m-5 p-4 rounded-md border bg-indigo-500 text-white cursor-pointer"
                onClick={() => setCounter(counter + 1)}
              >
                Click to earn
              </a>
              <a
                className="m-5 p-4 rounded-md border bg-green-500 text-white cursor-pointer"
                onClick={() => getClaimableRewards()}
              >
                Claim Rewards
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
