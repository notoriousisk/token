import React from "react";
import CheckBalance from "../components/CheckBalance";
import TransferTokens from "../components/TransferTokens";

const HomePage = ({
    address,
    setAddress,
    windowContract,
}) => {
    
    
    return (
        <div>
            <div className='mt-4'>
                <CheckBalance
                    address={address}
                    setAddress={setAddress}
                    windowContract={windowContract}
                />
                <TransferTokens windowContract={windowContract} />
            </div>
        </div>
    );
};

export default HomePage;
