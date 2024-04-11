import React from "react";
import ListTransfers from "../components/ListTransfers";


const ChequesPage = ({windowContract}) => {
    return (
        <div className='mt-4'>
            <ListTransfers windowContract={windowContract} />
        </div>
    );
};

export default ChequesPage;
