import React, { useState } from "react";

const SendTokens = ({ windowContract }) => {
    const [amount, setAmount] = useState();
    const [recipientsNumber, setRecipientsNumber] = useState();
    const [password, setPassword] = useState("");
    const [sendTokensOutput, setSendTokensOutput] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleRecipientsNumberChange = (event) => {
        setRecipientsNumber(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSendTokens = async () => {
        try {
            const result = await windowContract.methods
                .sendTokens(amount, recipientsNumber, password)
                .send({ from: window.web3.eth.defaultAccount });
            console.log("result:", result);
            setSendTokensOutput(result.toString());
        } catch (error) {
            console.error("Error sending tokens:", error);
        }
    };
    return (
        <div className='border border-gray-300 rounded p-2'>
            <input
                type='number'
                value={amount}
                onChange={handleAmountChange}
                placeholder='Enter amount of tokens to send'
                className='border border-gray-300 rounded px-1 py-1'
            />

            <input
                type='number'
                value={recipientsNumber}
                onChange={handleRecipientsNumberChange}
                placeholder='Enter recipients number'
                className='border border-gray-300 rounded px-1 py-1 ml-2'
            />

            <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter password'
                className='border border-gray-300 rounded px-1 py-1 ml-2'
            />
            <button
                className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2'
                onClick={handleSendTokens}
            >
                Send Tokens
            </button>
            <div className='border-l border-gray-300 rounded mt-2 p-2'>
                Link to receive tokens: {sendTokensOutput}
            </div>
        </div>
    );
};

export default SendTokens;
