import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TokenNavbar from "./components/TokenNavbar";
import HomePage from "./pages/HomePage";
import SendTokensPage from "./pages/SendTokensPage";
import ReceiveTokensPage from "./pages/ReceiveTokensPage";
import ChequesPage from "./pages/ChequesPage";

import loadContract from "./LoadContract";

function App() {
    const windowContract = window.contract;
    const [address, setAddress] = useState("");

    const [contractLoaded, setContractLoaded] = useState(false);
    useEffect(() => {
        if (!contractLoaded) {
            loadEverything();
        }
    }, [contractLoaded]);
    async function loadEverything() {
        try {
            await loadContract();
            setContractLoaded(true);
            setAddress(window.web3.eth.defaultAccount);
        } catch (error) {
            console.error("Error loading contract:", error);
        }
    }
    if (!contractLoaded) {
        return (
            <div className='mx-auto flex min-h-screen max-w-screen-xl flex-col'>
                <TokenNavbar />
                <h1 className="mx-4 text-bold">Connecting account...</h1>
            </div>
        );
    }
    return (
        <Router basename="/token"> 
            <div className='mx-auto flex min-h-screen max-w-screen-xl flex-col '>
                <TokenNavbar />
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <HomePage
                                address={address}
                                setAddress={setAddress}
                                windowContract={windowContract}
                            />
                        }
                    />
                    <Route
                        path='/send'
                        element={
                            <SendTokensPage windowContract={windowContract} />
                        }
                    />
                    <Route
                        path='/receive/:address'
                        element={
                            <ReceiveTokensPage
                                windowContract={windowContract}
                            />
                        }
                    />
                    <Route
                        path='/receive'
                        element={
                            <ReceiveTokensPage
                                windowContract={windowContract}
                            />
                        }
                    />
                    <Route
                        path='/cheques'
                        element={
                            <ChequesPage windowContract={windowContract} />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
