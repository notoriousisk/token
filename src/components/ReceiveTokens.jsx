import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReceiveTokens = ({ windowContract }) => {
    const { address } = useParams();

    useEffect(() => {
        setUniqueString(address || "");
    }, [address]);

    const [recievePassword, setRecievePassword] = useState("");
    const [uniqueString, setUniqueString] = useState("");
    const [receiveTokensOutput, setReceiveTokensOutput] = useState("");
    const [receiveTokensError, setReceiveTokensError] = useState("");

    const handleRecievePasswordChange = (event) => {
        setRecievePassword(event.target.value);
    };

    const handleUniqueStringChange = (event) => {
        setUniqueString(event.target.value);
    };

    const handleReceiveTokens = async () => {
        try {
            if (uniqueString === "") {
                setReceiveTokensError("Unique string cannot be empty.");
                return;
            }

            const result = await windowContract.methods
                .receiveTokens(uniqueString, recievePassword)
                .send({ from: window.web3.eth.defaultAccount });

            console.log("result:", result);
            setReceiveTokensOutput(
                `Received ${result.toString()} tokens successfully.`
            );
            setReceiveTokensError("");
        } catch (error) {
            console.error("Error receiving tokens:", error);
            setReceiveTokensOutput("");
            setReceiveTokensError(error.message);
        }
    };
    return (
        <div className='border border-gray-300 rounded p-2'>
            <input
                type='text'
                value={uniqueString}
                onChange={handleUniqueStringChange}
                placeholder='Enter unique string'
                className={`border ${
                    receiveTokensError ? "border-red-500" : "border-gray-300"
                } rounded px-2 py-1`}
            />
            <input
                type='password'
                value={recievePassword}
                onChange={handleRecievePasswordChange}
                placeholder='Enter password'
                className='border border-gray-300 rounded px-2 py-1 ml-2'
            />
            <button
                className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2'
                onClick={handleReceiveTokens}
            >
                Receive Tokens
            </button>
            {receiveTokensOutput && (
                <p className='text-green-500 mt-2'>{receiveTokensOutput}</p>
            )}
            {receiveTokensError && (
                <p className='text-red-500 mt-2'>{receiveTokensError}</p>
            )}
        </div>
    );
};

export default ReceiveTokens;
