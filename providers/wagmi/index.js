// Imports
// ========================================================
// import core & vendor packages below
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// import web3modal v2 packages below
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bsc, sepolia } from "wagmi/chains";
// import { WagmiConfig, createClient } from "wagmi";
// import { getDefaultProvider } from 'ethers';

// Config
// ========================================================
// web3modal config
const chains = [arbitrum, mainnet, polygon, bsc, sepolia];
const projectId = "33dcd74ae36c05bc526d6527349b439b";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Provider
// ========================================================
const WagmiProvider = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
        <ToastContainer />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

// Exports
// ========================================================
export default WagmiProvider;
