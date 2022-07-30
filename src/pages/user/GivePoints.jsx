import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {NotificationManager} from "react-notifications";
import UserFooter from "../../components/user/UserFooter";
import { chains } from "../../smart-contract/chains_constants";
const CampaignFactory = require("../../smart-contract/build/CampaignFactory.json");

const GivePoints = () => {
  const [claimed, setClaimed] = useState(false);
  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const [gpAmount, setGpAmount] = useState(0);
  const [campaignCounts, setCampaignCounts] = useState(0);

  const getGPInfo = async () =>{
    if(account && chainId && globalWeb3)
    {        
      const factory = new globalWeb3.eth.Contract(
        CampaignFactory,
        chains[chainId?.toString()]?.factoryAddress
      );
      if(factory)
      {
        try{
          let gpamount = await factory.methods.getStakedAmount(account).call() || 0;
          gpamount = globalWeb3.utils.fromWei(gpamount.toString(), "ether");
          setGpAmount(gpamount);
          let camCounts = await factory.methods.getCountOfCampaignsCausedGpStaking(account).call() || 0;
          setCampaignCounts(camCounts);
        }catch(e){
          console.error(e);
        }
      }
    }
  }

  useEffect(()=>{    
    getGPInfo();
  }, [account, globalWeb3, chainId])

  const onClickClaim = async () =>{
    if(account && chainId && globalWeb3 && gpAmount>0)
    {        
      const factory = new globalWeb3.eth.Contract(
        CampaignFactory,
        chains[chainId?.toString()]?.factoryAddress
      );
      if(factory)
      {
        try{
          await factory.methods.GPClaim(account).send({            
            from: account,
            gas: 3000000
          });          
          setClaimed(true);
          getGPInfo();
        }catch(err){
          console.error(err);
          if(err.code && err.code === 4100) NotificationManager.warning("Please unlock your wallet and try again."); 
        }
      }
    }else{
      NotificationManager.warning("Please connect your wallet."); 
    }
  }

  return (
    <div>
      <div className="py-20 px-10 wholeWrapper">
        <div className="flex items-center pageHead">
          <h1 className="text-slate-900 dark:text-white font-bold overview">GivePOINTS</h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {account && <h2>{account.toString().substring(0, 6)+"..."+account.toString().substring(38, 42)}</h2>}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="pointsCard">
            <h3>CLAIM YOUR GIVE POINTS</h3>

            <div className="flex items-start pointDetails">
              <h1 className="w-1/2">
                You have earned <span>{gpAmount} GIVE</span>POINTS for donating to {campaignCounts}
                <span> campaigns</span>.
              </h1>

              <div className="flex justify-center items-center w-1/2 mt-10">
                {claimed === true ? (
                  <button className="claimedBtn">CLAIMED</button>
                ) : (
                  <button onClick={() => onClickClaim()} className="claimBtn">
                    CLAIM
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter  style={{ backgroundColor:"transparent" }} />
    </div>
  );
};

export default GivePoints;
