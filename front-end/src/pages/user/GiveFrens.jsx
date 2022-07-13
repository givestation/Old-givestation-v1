import React from "react";
import copyIcon from "./assets/copy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router";

const GiveFrens = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const {id} = useParams();

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div>
      <div className="py-20 px-10 wholeWrapper">
        <div className="flex items-center pageHead">
          <h1 className="text-white font-bold overview">
            Give Friends (Referrals)
          </h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {id && <h2>{id.toString().substring(0, 6)+"..."+id.toString().substring(38, 42)}</h2>}
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
              <CopyToClipboard text="GIVEEQW2" onCopy={onCopyText}>
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
              <div className="referalCount">
                <h2>25</h2>
                <p>Active Referrals</p>
              </div>

              <div className="referalCount">
                <h3 className="uppercase">10 POINTS</h3>
                <p className="uppercase">GIVEPOINTS EARNED</p>
              </div>
            </div>

            <div>
              <button>Claim</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer flex justify-center items-center">
        <img width={92} height={76} src="/images/logo.png" alt="logo" />
        <h1 className="text-white font-bold text-xl ml-16">GiveDAO</h1>
        <h1 className="text-white font-bold text-xl ml-12">About</h1>
        <h1 className="text-white font-bold text-xl ml-12">How it works</h1>
      </div>
    </div>
  );
};

export default GiveFrens;
