import React, { useState } from "react";

const GivePoints = () => {
  const [claimed, setClaimed] = useState(false);

  return (
    <div>
      <div className="py-20 px-10 wholeWrapper">
        <div className="flex items-center pageHead">
          <h1 className="text-white font-bold overview">GivePOINTS</h1>
          <div className="accountNo ml-7">
            <h2>0xdeswqes35derihi87987gjhge</h2>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="pointsCard">
            <h3>CLAIM YOUR GIVE POINTS</h3>

            <div className="flex items-start pointDetails">
              <h1 className="w-1/2">
                You have earned <span>50 GIVE</span>POINTS for donating to 3
                <span> campaigns</span>.
              </h1>

              <div className="flex justify-center items-center w-1/2">
                {claimed === true ? (
                  <button className="claimedBtn">CLAIMED</button>
                ) : (
                  <button onClick={() => setClaimed(true)} className="claimBtn">
                    CLAIM
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer flex justify-center items-center">
        <img width={92} height={76} src="/images/logo.svg" alt="logo" />
        <h1 className="text-white font-bold text-xl ml-16">GiveDAO</h1>
        <h1 className="text-white font-bold text-xl ml-12">About</h1>
        <h1 className="text-white font-bold text-xl ml-12">How it works</h1>
      </div>
    </div>
  );
};

export default GivePoints;
