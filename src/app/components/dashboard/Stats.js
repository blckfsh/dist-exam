"use client";
import { ethers } from "ethers";
import { useAccount, useContractReads } from "wagmi";

import ClientOnly from "@/app/clientOnly";
import dispenserABI from "../../abi/dispenser.json";
import nftABI from "../../abi/nft.json";
import coinABI from "../../abi/nft.json";

export function Stats() {
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

  const { data, isLoading, isError } = useContractReads({
    contracts: [
      {
        ...dispenserContract,
        functionName: "totalRewardsDistributed",
      },
      {
        ...nftContract,
        functionName: "totalSupply",
      },
      {
        ...coinContract,
        functionName: "totalSupply",
      },
    ],
    watch: true,
  });

  if (!isLoading) {
    return (
      <div className="w-full mx-auto lg:px-8 px-6 pb-3">
        <div className="flex lg:flex-row flex-row flex-wrap">
          <div className="flex-1 mx-2 mt-3">
            <div className="py-4 rounded bg-white text-black border rounded shadow">
              <div className="flex flex-col flex-wrap px-4">
                <div className="flex-1">
                  <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                    {data[1].result ? data[1].result.toString() : "-"}
                  </h1>
                  <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                    <p>NFT Rewards Minted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 mx-2 mt-3">
            <div className="py-4 rounded bg-white text-black border rounded shadow">
              <div className="flex flex-col flex-wrap px-4">
                <div className="flex-1">
                  <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                    <ClientOnly>
                      {data[0].result
                        ? ethers.formatEther(data[0].result.toString())
                        : "-"}
                    </ClientOnly>
                  </h1>
                  <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                    <p>Distributed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 mx-2 mt-3">
            <div className="py-4 rounded bg-white text-black border rounded shadow">
              <div className="flex flex-col flex-wrap px-4">
                <div className="flex-1">
                  <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
                    {data[2].result
                      ? ethers.formatEther(data[2].result.toString())
                      : "-"}
                  </h1>
                  <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                    <p>Coin Supply</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
