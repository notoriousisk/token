import React from "react";
import ReceiveTokens from "../components/ReceiveTokens";


const ReceiveTokensPage = ({windowContract}) => {
    return (
        <div className='mt-4'>
            <ReceiveTokens windowContract={windowContract} />
        </div>
    );
};

export default ReceiveTokensPage;
