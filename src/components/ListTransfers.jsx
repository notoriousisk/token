import React, { useState } from "react";

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

    const handleAllTransfers = async () => {
        try {
            const c = await handleListTransfers();
            console.log("c:", c);
            const tranferObjects = [];
            for (let i = 0; i < transferList.length; i++) {
                const transferDetails = await getTransferDetails(
                    transferList[i]
                );
                const transferObject = {
                    uniqueString: transferList[i],
                    amount: transferDetails ? transferDetails[0] : "",
                    recipientsNumber: transferDetails ? transferDetails[1] : "",
                    numberLeft: transferDetails ? transferDetails[2] : "",
                };
                tranferObjects.push(transferObject);
            }
            setAllTransfers(tranferObjects);
            console.log("allTransfers:", tranferObjects);
        } catch (error) {
            console.error("Error getting transfer info:", error);
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

    const handleDeleteTransfer = async (transfer) => {
        if (window.confirm("Are you sure you want to refund this transfer?")) {
            try {
                const result = await windowContract.methods
                    .cancelTransfer(transfer)
                    .send({ from: window.web3.eth.defaultAccount });
                console.log("result:", result);
                handleAllTransfers();
            } catch (error) {
                console.error("Error deleting transfer:", error);
            }
        } else {
            console.log("Transfer deletion cancelled");
        }
    };

    const [allTransfers, setAllTransfers] = useState([]);
    const [transferList, setTransferList] = useState([]);
    const [showEmptyTransfers, setShowEmptyTransfers] = useState(true);

    return (
        <div className='border border-gray-300 rounded p-2'>
            <div className='flex flex-row items-center'>
                <button
                    className='bg-gray-900 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
                    onClick={handleAllTransfers}
                >
                    List Transfers
                </button>
                <button
                    onClick={() => setShowEmptyTransfers(!showEmptyTransfers)}
                    className='pl-4'
                >
                    <img
                        src={
                            showEmptyTransfers
                                ? "/toggle-on.svg"
                                : "/toggle-off.svg"
                        }
                        alt='toggle'
                    />
                </button>
                <p className='pr-4'>Show empty transfers</p>
            </div>
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
                    {allTransfers
                        .filter(
                            (transfer) =>
                                showEmptyTransfers || transfer.numberLeft > 0
                        )
                        .map((transfer, index) => {
                            return (
                                <tr
                                    key={index}
                                    className='border border-gray-300'
                                >
                                    <td
                                        className='border border-gray-300 px-4 py-2 overflow-x-auto max-w-[250px] cursor-pointer'
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                "isk-token-qr.netlify.app/receive/" +
                                                    transfer.uniqueString
                                            );
                                        }}
                                    >
                                        {transfer.uniqueString}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 overflow-x-auto max-w-[200px]'>
                                        {transfer.amount.toString()}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        {transfer.recipientsNumber.toString()}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        {transfer.numberLeft.toString()}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        {transfer.numberLeft > 0 ? (
                                            <button
                                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                                onClick={() =>
                                                    handleDeleteTransfer(
                                                        transfer.uniqueString
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        ) : (
                                            <button className='bg-zinc-600 text-white font-bold py-2 px-4 rounded disabled pointer-events-none'>
                                                Delete
                                            </button>
                                        )}
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
