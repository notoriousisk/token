import React, { useState } from "react";

const TransferTokens = ({ windowContract }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransferTokens = async () => {
    try {
      const result = await windowContract.methods
        .transfer(address, amount)
        .send({ from: window.web3.eth.defaultAccount });
      console.log("result:", result);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div className='border border-gray-300 rounded p-2 my-2'>
      <h2>Transfer Tokens</h2>
      <input
        placeholder="Enter address to transfer tokens to"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className='border border-gray-300 rounded px-2 py-1'
      />
      <input
        placeholder="Enter amount to transfer"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='border border-gray-300 rounded px-2 py-1 mx-2'
      />
      <button
        className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
        onClick={handleTransferTokens}
      >
        Transfer Tokens
      </button>
    </div>
  );
};

export default TransferTokens;