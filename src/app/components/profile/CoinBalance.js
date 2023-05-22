"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
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
  const [counter, setCounter] = useState(0);
  const [claimId, setClaimId] = useState(0);
  const [tokenId, setTokenId] = useState(999);
  const [signature, setSignature] = useState("");
  const [amount, setAmount] = useState("0");
  const [distributed, setDistributed] = useState("0");
  const [isEnabled, setIsEnabled] = useState(false);

  const dispenserContract = {
    address: process.env.dispenserAddress,
    abi: dispenserABI,
  };

  const nftContract = {
    address: process.env.nftAddress,
    abi: nftABI,
  };

  const coinContract = {
    address: process.env.coinAddress,
    abi: coinABI,
  };

  // wagmi hooks
  const { isConnected, address } = useAccount();
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...dispenserContract,
        functionName: "totalClaimed",
        args: [tokenId],
      },
      {
        ...nftContract,
        functionName: "tokenOfOwnerByIndex",
        args: [profAddress, 0],
      },
      {
        ...nftContract,
        functionName: "balanceOf",
        args: [profAddress],
      },
      {
        ...coinContract,
        functionName: "balanceOf",
        args: [profAddress],
      },
    ],
    watch: true,
  });

  // const convertedAmount = parseInt(
  //   ethers
  //     .parseEther((parseInt(amount) - parseInt(data[0].result.toString())).toString())
  //     .toString()
  // );
  const convertedAmount = parseInt(amount);

  // console.log(
  //   claimId,
  //   tokenId,
  //   parseInt(ethers.parseEther(convertedAmount.toString()).toString()),
  //   signature
  // );
  const { config, status: prepStatus } = usePrepareContractWrite({
    address: process.env.dispenserAddress, // minter address
    abi: dispenserABI,
    functionName: "claimRewards",
    args: [
      claimId,
      tokenId,
      parseInt(ethers.parseEther(convertedAmount.toString()).toString()),
      signature,
    ],
    enabled: isEnabled,
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
      nftId: parseInt(
        parseInt(data[2].result.toString()) > 0 ? data[1].result.toString() : ""
      ),
      reward: ethers.parseEther("1.0").toString(),
    };

    // console.log(body);
    if (body.nftId !== "") {
      const headers = {
        "Content-Type": "application/json", // Example header
      };

      const response = await fetch(`${process.env.nftAPI}/add_reward`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),        
      });

      if (response.status === 200) {
        const output = response.json();
        await output.then((data) => {
          toastHandler(false, `Coin Earned`);
        });
        fetchUndistributedRewards();
      }
      // fetchClaimableInfo();
    }
  };

  const fetchClaimableInfo = useCallback(async () => {
    if (parseInt(data[2].result.toString()) > 0) {
      const response = await fetch(
        `${
          process.env.nftAPI
        }/user_token_reward_claim_data?nftId=${data[1].result.toString()}`,
        // {next: { revalidate: 10 }}
      );
      if ((await response.status) === 200) {
        const output = await response.json();
        const details = await output.item.Value;
        const mintableRewards =
          parseInt(ethers.formatEther(details.accumulatedAmount)) -
          parseFloat(data[0].result.toString());

        // console.log(details.accumulatedAmount);

        setClaimId(details.claimId);
        setSignature(details.signature);
        setAmount(mintableRewards);
        setTokenId(parseInt(data[1].result.toString()));
      }
    }
  }, []);

  const fetchUndistributedRewards = useCallback(async () => {
    if (parseInt(data[2].result.toString()) > 0) {
      const response = await fetch(
        `${
          process.env.nftAPI
        }/get_undistributed_user_rewards?nftId=${data[1].result.toString()}`,
        // {next: { revalidate: 10 }}
      );

      if ((await response.status) === 200) {
        const output = await response.json();
        setDistributed(ethers.formatEther(output.updatedReward).toString());
      }
    }
  });

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
    // console.log(prepStatus);
    // console.log(writeStatus);
    // console.log(isEnabled);
    // isEnabled == true && write?.();

    fetchClaimableInfo();
    fetchUndistributedRewards();

    // Schedule the fetch operation every 60 seconds
    const intervalId = setInterval(() => {
      fetchClaimableInfo();
      fetchUndistributedRewards();
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isEnabled]);
  // prepStatus

  if (!isLoading) {
    return (
      <div className="mx-2 py-4 rounded bg-white text-black border rounded shadow">
        <div className="flex flex-col flex-wrap px-4">
          <div className="py-5">
            <div className="px-5 border-b border-slate-200 pb-4 mb-4">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                Coin Details
              </h1>
            </div>
            {parseInt(data[2].result.toString()) > 0 ? (
              <div className="flex lg:flex-row flex-col">
                <div className="flex-1">
                  <p>
                    Claimable Coins:{" "}
                    {parseInt(amount) -
                      parseInt(
                        ethers.formatEther(data[0].result.toString()).toString()
                      )}
                  </p>
                  <p>Undistributed User Rewards: {distributed}</p>
                  <p>
                    Accumulated Rewards on this NFT:{" "}
                    {ethers.formatEther(data[0].result.toString())}
                  </p>
                  <p>
                  User Reward Token Balance:{" "}
                    {ethers.formatEther(data[3].result.toString())}
                  </p>
                </div>
                <div className="flex-1">
                  <a
                    className="m-5 p-4 rounded-md border bg-indigo-500 text-white cursor-pointer"
                    onClick={() => {
                      setIsEnabled(true)
                      getClaimableRewards()
                    }}
                  >
                    Click to earn
                  </a>
                  {parseInt(amount) -
                    parseInt(
                      ethers.formatEther(data[0].result.toString()).toString()
                    ) >
                  0 ? (
                    <a
                      className="m-5 p-4 rounded-md border bg-green-500 text-white cursor-pointer"
                      onClick={() => {                        
                        write()                        
                      }}
                    >
                      Claim Rewards
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
