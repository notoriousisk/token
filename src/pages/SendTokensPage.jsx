import React from "react";
import SendTokens from "../components/SendTokens";

const SendTokensPage = ({ windowContract}) => {
    return (
        <div className='mt-4'>
            <SendTokens windowContract={windowContract} />
        </div>
    );
};

export default SendTokensPage;
