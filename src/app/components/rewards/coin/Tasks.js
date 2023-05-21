"use client";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";

import nftABI from "../../../abi/nft.json";

export function Tasks() {
  // state hooks
  const [isEnabled, setEnabled] = useState(false);

  // wagmi hooks
  const { isConnected, address } = useAccount();
  const { data } = useContractRead({
    address: '0xb6539699d1143397d4F608237B0b8EF13528F119',
    abi: nftABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: isEnabled,
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })

  const [task, setTask] = useState([{ counter: 5 }]);

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

    if (task[index].counter === 1) {
      setEnabled(true);
    }

    // Allow to mint nft
    // Minting Sucessful: Save the address and add 1 NFT as reward to the database
  };

  const claimReward = (index, limit) => {
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

  if (isConnected === true) {
    return (
      <div className="w-full mx-2 py-4 rounded bg-white text-black border rounded shadow">
        <div className="flex flex-col flex-wrap px-4">
          <div className="py-5">
            <div className="px-5 border-b border-slate-200 pb-4 mb-4">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                Coin Rewards
              </h1>
            </div>
            <div className="rounded-lg">
              <div className="flex flex-row flex-wrap justify-start">
                <div className="bg-slate-100 rounded-xl">
                  <div className="flex items-center text-center bg-slate-500 rounded-t-xl w-96 h-28">
                    <h1 className="w-full text-white text-3xl font-bold">
                      NFT
                    </h1>
                  </div>
                  <div className="p-4">
                    <p>Id: 1234</p>
                    <p>Available Coin: 100</p>
                    <div className="flex items-center text-center w-full pt-4">
                      <a
                        className="w-full p-4 rounded-md border bg-indigo-800 text-white cursor-pointer"
                        onClick={() => handleClick(0)}
                      >
                        Click {task ? task[0].counter : 0} times
                      </a>
                    </div>                    
                    {task[0].counter === 0 && data.toString() === "0" ?  (
                      <div className="flex items-center text-center w-full pt-4">
                        <a
                          className="w-full p-4 rounded-md border bg-green-800 text-white cursor-pointer"
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
    );
  }

  return <div>Connect wallet</div>;
}
