import React from "react";
import SampleProject from "./assets/sampleProject.svg";
import HeartIcon from "./assets/heart.svg";
import { useNavigate, useParams } from "react-router";
import UserFooter from "../../components/user/UserFooter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../../config";
import { chains } from "../../smart-contract/chains_constants";

const MyProjects = () => {

  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const [campaigns, setCampaigns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const initProjectsInfo = async () => {
    if(chainId && globalWeb3 && account)
    {
      await axios({
        method: "post",
        url: `${backendURL}/api/campaign/getCampaignsOfUser`,
        data: {
            user: account || "",
            chainId:chainId || ""
        }
      }).then((res)=>{
          if(res.data && res.data.code === 0)
          {
            setCampaigns(res.data.data);
          }
      }).catch((err)=> {
          console.error(err);    
      });
    }
  }

  useEffect(() => {
    initProjectsInfo();
    setRefresh(!refresh);
  }, [account, globalWeb3, chainId, setRefresh])

  const onClickUpdate = (campaignAddress) => {
    if(campaignAddress) navigate(`update/${campaignAddress}`);
  }

  return (
    <div>
      <div className="py-20 px-10 wholeWrapper">
        <div className="flex items-center pageHead">
          <h1 className="text-slate-900 dark:text-white font-bold overview">My Grants</h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {account && <h2>{account.toString().substring(0, 6)+"..."+account.toString().substring(38, 42)}</h2>}
          </div>
        </div>

        <div className="mt-14 flex justify-center items-center flex-col">
          {
            campaigns.length>0 && 
            campaigns.map((item, index) => (
              <div className="flex projectCard" key={index} >
                <img src={`${backendURL}/${item?.imageURL}` || SampleProject} alt="" 
                    style={{ width:"348px", height:"200px", alignSelf:"center"}} className="projectImg" />
                <div className="flex justify-center items-start flex-col">
                  <div className="flex items-center">
                    <h1 className="projectTitle">{item?.name || ""}</h1>
                    <div className="tag">Active</div>
                    <div className="tag">{item?.verified === true ? "Verified" : "Unverified"}</div>
                  </div>

                  <div className="flex justify-start items-end projectDetails">
                    <h4 className="projectDesc">
                     {item?.description || ""}
                    </h4>

                    <div className="line" />

                    <div className="flex flex-col w-1/3 projectDesc">
                      <div className="flex justify-between items-center mb-1">
                        <span>Minimum Contribution</span>
                        <p>{item?.minimum || 0.01}{chains[chainId?.toString()]?.nativeCurrency}</p>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Target</span>
                        <p>{item?.target || 0.01}{chains[chainId?.toString()]?.nativeCurrency}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Raised</span>
                        <p>{item?.raised || 0.01}{chains[chainId?.toString()]?.nativeCurrency}</p>
                      </div>
                    </div>

                    <div className="line ml-32 mr-5 line1" />

                    <div className="flex justify-start items-start flex-col projectBtnsDiv ">
                      <div className="flex">
                        <img src={HeartIcon} alt="" />
                        <div className="likeCount flex justify-center items-center">
                          {item?.likes || 0}
                        </div>
                      </div>

                      <button className="updateBtn flex justify-center items-center " onClick={() => {onClickUpdate(item?.address)}}>
                        <p>Update</p>
                        <svg
                          width="6"
                          height="9"
                          viewBox="0 0 6 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 7.5L4.5 4.5L1.5 1.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <UserFooter  style={{ backgroundColor:"transparent" }} />
    </div>
  );
};

export default MyProjects;
