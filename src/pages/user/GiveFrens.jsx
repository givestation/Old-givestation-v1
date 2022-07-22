import React from "react";
import copyIcon from "./assets/copy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {NotificationManager} from "react-notifications";
import UserFooter from "../../components/user/UserFooter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { chains } from "../../smart-contract/chains_constants";
import { useState } from "react";
const CampaignFactory = require("../../smart-contract/build/CampaignFactory.json");

const GiveFrens = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const [gpAmount, setGpAmount] = useState(0);
  const [refCounts, setRefCounts] = useState(0);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

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
          let gpamount = await factory.methods.getStakedAmountWithRef(account).call() || 0;
          gpamount = globalWeb3.utils.fromWei(gpamount.toString(), "ether");
          setGpAmount(gpamount);
          let refCounts = await factory.methods.getCountsOfRefCausedGpStaking(account).call() || 0;
          setRefCounts(refCounts);
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
          await factory.methods.GPClaimRef(account).send({            
            from: account,
            gas: 3000000
          });          
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
          <h1 className="text-slate-900 dark:text-white font-bold overview">
            Give Friends (Referrals)
          </h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {account && <h2>{account.toString().substring(0, 6)+"..."+account.toString().substring(38, 42)}</h2>}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="inviteCard">
            <h4>Invite a friend to GiveStation and get GIVEPOINTS</h4>

            <h2>
              Give a friend your referral code on GiveStation and you'll get
              POINTS token for free!
            </h2>

            <div className="flex justify-center items-center gap-x-12 btnsWrap">
              <CopyToClipboard text={`${window.location.origin}/?ref=${account}`} onCopy={onCopyText}>
                <button className="copyBtn flex">
                  <img src={copyIcon} alt="" style={{ marginRight: 5 }} />
                  {isCopied ? "Copied!" : "GIVEEQW2"}
                </button>
              </CopyToClipboard>
              {/* <div className="inviteBtn">Invite Friends</div> */}
            </div>
          </div>
        </div>

        <div className="claimDiv">
          <div className="flex items-center justify-between btnsWrap">
            <div className="flex">
              <div className="referalCount bg-[#0F1B2E]">
                <h2>{refCounts}</h2>
                <p>Active Referrals</p>
              </div>

              <div className="referalCount bg-[#0F1B2E]">
                <h3 className="uppercase">{gpAmount} POINTS</h3>
                <p className="uppercase">GIVEPOINTS EARNED</p>
              </div>
            </div>

            <div>
              <button onClick={() => {onClickClaim()}}>Claim</button>
            </div>
          </div>
        </div>
      </div>

      <UserFooter/>
    </div>
  );
};

export default GiveFrens;
