import React from "react";
import CheckBalance from "../components/CheckBalance";

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
            </div>
        </div>
    );
};

export default HomePage;
