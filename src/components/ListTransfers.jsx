import React, { useState, useEffect } from "react";

const ListTransfers = ({ windowContract }) => {
    const handleListTransfers = async () => {
        try {
            const userTransfers = await windowContract.methods
                .getUserTransfers()
                .call({ from: window.web3.eth.defaultAccount });
            console.log("userTransfers:", userTransfers);
            setTransferList(userTransfers);
        } catch (error) {
            console.error("Error listing transfers:", error);
        }
    };

    

    const getTransferDetails = async (transfer) => {
        try {
            const transferDetails = await windowContract.methods
                .getTransferDetails(transfer)
                .call({ from: window.web3.eth.defaultAccount });
            console.log("transferDetails:", transferDetails);
            return transferDetails;
        } catch (error) {
            console.error("Error getting transfer info:", error);
            return null;
        }
    };

    const [transferList, setTransferList] = useState([]);

    return (
        <div className='border border-gray-300 rounded p-2'>
            <button
                className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
                onClick={handleListTransfers}
            >
                List Transfers
            </button>
            <table className='border border-gray-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2'>
                            Unique string
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Total amount
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Number of people
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Collections left
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transferList.map((transfer, index) => {
                        const transferDetails = getTransferDetails(transfer);
                        return (
                            <tr key={index} className='border border-gray-300'>
                                <td className='border border-gray-300 px-4 py-2 overflow-x-auto max-w-[250px]'>
                                    {transfer}
                                </td>
                                <td className='border border-gray-300 px-4 py-2 overflow-x-auto max-w-[200px]'>
                                    {transferDetails ? transferDetails[0] : ""}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {transferDetails ? transferDetails[1] : ""}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {transferDetails ? transferDetails[2] : ""}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListTransfers;
