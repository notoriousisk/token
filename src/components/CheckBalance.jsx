import React, { useState } from "react";

const CheckBalance = ({ address, setAddress, windowContract }) => {
    const [balance, setBalance] = useState("");

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCheckBalance = async () => {
        try {
            const balance = await windowContract.methods
                .balanceOf(address)
                .call();
            setBalance(balance.toString());
        } catch (error) {
            console.error("Error checking balance:", error);
            alert(
                error.message.includes('"address" validation')
                    ? "Invalid address"
                    : "Error. Check console for details."
            );
        }
    };

    return (
        <div className='border border-gray-300 rounded p-2'>
            <div>
                <input
                    type='text'
                    value={address}
                    onChange={handleAddressChange}
                    placeholder='Enter address'
                    className='border border-gray-300 rounded px-2 py-1'
                />
                <button
                    className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2'
                    onClick={handleCheckBalance}
                >
                    Check Balance
                </button>
            </div>
            <div className='border-b border-gray-300 rounded mt-2 p-2'>
                Balance: {balance} {balance ? "ISK" : ""}
            </div>
        </div>
    );
};

export default CheckBalance;
