import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.scss";
import "bootstrap";


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";

// IMPORTS
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Users from "./pages/Users";
import Crash from "./pages/Crash";
import ComingSoon from "./pages/Faq";
import {BalanceProvider} from "./BalanceContext";
import { useMemo, useState} from "react";
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

// const ENDPOINT = 'https://casinoghostbackend.herokuapp.com/'
// let socket;

function App() {
    const network = "mainnet";
    const endpoint = "https://api.metaplex.solana.com/";
    const [userBalance, setUserBalance] = useState(0)



    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSlopeWallet(),
            getSolflareWallet(),
            getSolletExtensionWallet(),
            getSolletWallet(),
            getTorusWallet(),
        ], [network]);

  return (
    <>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <BalanceProvider>
                    <Routes>
                        <Route exact path="/" element={<Crash />} />
                        {/*<Route exact path="/flip" element={<Home />} />*/}
                        {/*<Route exact path="/users" element={<Users />} />*/}
                        {/*<Route exact path="/crash" element={<Crash />} />*/}
                        <Route exact path="/soon" element={<ComingSoon />} />
                    </Routes>
                    </BalanceProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    </>
  );
}

export default App;
