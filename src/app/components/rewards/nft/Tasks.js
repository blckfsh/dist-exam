"use client";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import minterABI from "../../../abi/minter.json";

export function Tasks() {
  // state hooks
  const [task, setTask] = useState([
    { counter: 5 },
    { counter: 10 },
    { counter: 15 },
  ]);
  const [claimId, setClaimId] = useState(0);
  const [signature, setSignature] = useState("");

  // wagmi hooks
  const { isConnected, address } = useAccount();
  const { config, status: prepStatus } = usePrepareContractWrite({
    address: process.env.minterAddress, // minter address
    abi: minterABI,
    functionName: "claim",
    args: [claimId, signature],
    enabled: claimId > 0 && signature !== "" ? true : false,
    overrides: {
      from: address,
      gasLimit: 1000000,
    },
  });
  const {
    data,
    write,
    status: writeStatus,
    reset,
  } = useContractWrite({
    mode: "prepared",
    ...config
  });
  const { isFetching } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toastHandler(false, "success");
    },
    onError(error) {
      toastHandler(true, "failed");
    },
  });

  const handleClick = (index) => {
    setTask((prevTask) => {
      const updatedTask = [...prevTask]; // Create a new copy of the task array
      if (updatedTask[index].counter !== 0) {
        updatedTask[index] = {
          ...updatedTask[index],
          counter: updatedTask[index].counter - 1,
        }; // Update the counter property of the object by index
      }
      return updatedTask; // Update the state with the modified task array
    });

    // Allow to mint nft
    // Minting Sucessful: Save the address and add 1 NFT as reward to the database
  };

  const claimReward = async (index, limit) => {
    const data = {
      receiverAddress: address,
    };
    const headers = {
      "Content-Type": "application/json", // Example header
    };
    const response = await fetch(
      `${process.env.nftAPI}/register_address_for_reward`,
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

    fetchRegisters();

    setTask((prevTask) => {
      const updatedTask = [...prevTask]; // Create a new copy of the task array
      if (updatedTask[index].counter === 0) {
        updatedTask[index] = {
          ...updatedTask[index],
          counter: limit,
        }; // Update the counter property of the object by index
      }
      return updatedTask; // Update the state with the modified task array
    });
  };

  const fetchRegisters = useCallback(async () => {
    const response = await fetch(
      `${process.env.nftAPI}/is_register_for_nft_reward?address=${address}`
    );
    const output = await response.json();
    const data = JSON.parse(output.item.result);        
    setClaimId(data.claimId);
    setSignature(data.signature);
  }, [claimId, signature]);

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

  if (isConnected === true) {
    return (
      <div className="w-full mx-2 py-4 rounded bg-white text-black border rounded shadow">
        <div className="flex flex-col flex-wrap px-4">
          <div className="py-5">
            <div className="px-5 border-b border-slate-200 pb-4 mb-4">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                NFT Rewards
              </h1>
            </div>
            <div className="rounded-lg">
              <div className="flex flex-col">
                <div className="flex-1 py-4">
                  <div className="flex lg:flex-row flex-col">
                    <div className="basis-1/2">
                      <p>Hit the button {task ? task[0].counter : 0} times</p>
                    </div>
                    <div className="basis-1/2">
                      <div className="flex flex-row">
                        <div>
                          <a
                            className="m-5 p-4 rounded-md border bg-indigo-800 text-white cursor-pointer"
                            onClick={() => handleClick(0)}
                          >
                            Click Me
                          </a>
                        </div>
                        {task[0].counter === 0 ? (
                          <div>
                            <a
                              className="m-5 p-4 rounded-md border bg-green-500 text-white cursor-pointer"
                              onClick={() => claimReward(0, 5)}
                            >
                              Claim Rewards
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Connect wallet</div>;
}
