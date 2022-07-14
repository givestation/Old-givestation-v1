import React from "react";
import LikeCampImg from "./assets/likeCampImg.svg";
import Kemono from "./assets/Kemono.svg";
import { useNavigate, useParams } from "react-router";
import UserFooter from "../../components/user/UserFooter";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../../config";
import { chains } from "../../smart-contract/chains_constants";

export default function Donations() {
  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getDonationInfo = async () => {
      if(globalWeb3 && account)
      {        
        await axios({
          method: "post",
          url: `${backendURL}/api/donation/getDonationsOfUser`,
          data: {
              user: account || "",
              chainId:chainId || ""
          }
        }).then((res)=>{
            console.log(res.data);
            if(res.data && res.data.code === 0)
            {
              setDonations(res.data.data);
            }
        }).catch((err)=> {
            console.error(err);    
        });
      }
    }
    getDonationInfo();
  }, [globalWeb3, account])

  return (
    <div className="py-20 px-10 wholeWrapper">
      <div className="flex items-center pageHead">
        <h1 className="text-slate-900 dark:text-white font-bold overview">Donations</h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {account && <h2>{account.toString().substring(0, 6)+"..."+account.toString().substring(38, 42)}</h2>}
        </div>
      </div>

      <div className="mt-14 flex justify-center items-center flex-col">
        {
          donations.length>0 &&   
          donations.map((item, index) => {
            <div className="flex likeCard">
              <div className="flex w-3/4 likeDesc">
                <img src={item?.campaign? item.campaign.imageURL : LikeCampImg} alt="" />

                <div className="likeCardDetail w-1/2">
                  <h6 className="flex">
                    {item?.campaign? item.campaign.name : ""}{" "}
                    {/* <img src={Kemono} alt="" style={{ marginLeft: 5 }} /> */}
                  </h6>
                  <p>
                  {
                    item?.campaign?
                    item.campaign.description
                    :
                    ""
                  }
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center w-1/4 likeBtns">
                <div className="donationPrice">{item?.amount? globalWeb3.utils.fromWei(item.amount.toString(), "ether"):"0"}{chains[chainId.toString()]?.nativeCurrency}</div>
                <h4 onClick={()=>{ item?.campaign && navigate(`/campaign/${item.campaign.address}`)  }}>view campaign</h4>
              </div>
            </div>
          })
        }        
      </div>
      <UserFooter/>
    </div>
  );
}
