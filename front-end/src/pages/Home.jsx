
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useQueryParam } from "use-params-query";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import HeartIcon from "./user/assets/heart.svg";
import HeartBlankIcon from "./user/assets/heart-blank.svg";
import HeaderHome from '../components/HeaderHome'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { chains } from '../smart-contract/chains_constants';
import { updateReferalAddress } from '../store/actions/auth.actions';
import { backendURL } from '../config';
const CampaignFactory = require("../smart-contract/build/CampaignFactory.json");
const Campaign = require("../smart-contract/build/Campaign.json");

export default function Home() {
  const [dropdown, setDropdown] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [ViewRequests, setViewRequests] = useState([]);
  const [copied, setCopied] = useState(false);
  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regexForWallet = /^(0x[a-fA-F0-9]{40})$/gm;

  const ref = useQueryParam("ref");

  useEffect(() => {
    if (ref !== undefined) {
      let m; let correct = false;
      while ((m = regexForWallet.exec(ref)) !== null) {
        if (m.index === regexForWallet.lastIndex) {
          regexForWallet.lastIndex++;
        }
        if (m[0] === ref) {
          correct = true;
          dispatch(updateReferalAddress(ref));
        }
      }
      if (!correct) {
        // dispatch(updateReferalAddress("0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6"));
      }
    } else {
      // dispatch(updateReferalAddress("0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6"));
    }
  }, [ref])
  const getSummary = async () => {
    try {
      const factory = new globalWeb3.eth.Contract(
        CampaignFactory,
        chains[chainId?.toString()].factoryAddress
      );
      let summary = [], campais = [];
      if (factory) {
        campais = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(campais);
        summary = await Promise.all(
          campais.map((campaign, i) =>
            new globalWeb3.eth.Contract(Campaign, campais[i]).methods.getSummary().call()
          )
        );

        console.log("[Home.jsx] campaigns = ", campais);
      }
      if (campais.length > 0) {
        await axios({
          method: "post",
          url: `${backendURL}/api/campaign/all`,
          data: {
            chainId: chainId
          }
        }).then((res) => {
          console.log(res.data);
          if (res.data && res.data.code === 0) {
            let summaryFromDB = res.data.data || [];
            if (summaryFromDB.length > 0) {
              for (let idx = 0; idx < summary.length; idx++) {
                let found = summaryFromDB.find((item) => item.address === campais[idx]) || undefined;
                if (found) {
                  summary[idx][5] = found.name;
                  summary[idx][6] = found.description;
                  summary[idx][7] = found.imageURL;
                  summary[idx][9] = found.verified;
                  summary[idx][11] = found.category;
                  summary[idx][12] = found.likes;
                  summary[idx][13] = false;
                  summary[idx][14] = found._id;
                  summary[idx][1] = found.raised;
                }
              }
            }
          }
        }).catch((err) => {
          console.error(err);
        });
        await axios({
          method: "post",
          url: `${backendURL}/api/likes/getAllLikedCampaigns`,
          data: {
            user: account || "",
            chainId: chainId || ""
          }
        }).then((res) => {
          console.log(res.data);
          if (res.data && res.data.code === 0) {
            let summaryFromDB = res.data.data || [];
            if (summaryFromDB.length > 0) {
              for (let idx = 0; idx < summary.length; idx++) {
                let found = summaryFromDB.find((item) => item.campaign.address === campais[idx]) || undefined;
                if (found) {
                  summary[idx][13] = found.value;
                }
              }
            }
            console.log("summary =", summary);
            setViewRequests(summary);
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  const getAllFromDB = async () => {

    let summary = [{}], campais = [];
    await axios({
      method: "post",
      url: `${backendURL}/api/campaign/all`,
      data: {
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data && res.data.code === 0) {
        let summaryFromDB = res.data.data || [];
        console.log("summaryFromDB = ", summaryFromDB);
        if (summaryFromDB.length > 0) {
          for (let idx = 0; idx < summaryFromDB.length; idx++) {
            let found = summaryFromDB[idx] || undefined;
            if (found) {
              summary[idx][5] = found.name;
              summary[idx][6] = found.description;
              summary[idx][7] = found.imageURL;
              summary[idx][9] = found.verified;
              summary[idx][11] = found.category;
              summary[idx][1] = found.raised;
              summary[idx][12] = found.likes;
              summary[idx][13] = false;
              summary[idx][14] = found._id;
              campais[idx] = found.address;
            }
          }
        }
        setCampaigns(campais);
      }
    }).catch((err) => {
      console.error(err);
    });
    await axios({
      method: "post",
      url: `${backendURL}/api/likes/getAllLikedCampaigns`,
      data: {
        user: account || "",
        chainId: chainId || ""
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data && res.data.code === 0) {
        let summaryFromDB = res.data.data || [];
        if (summaryFromDB.length > 0) {
          for (let idx = 0; idx < summary.length; idx++) {
            let found = summaryFromDB.find((item) => item.campaign.address === campais[idx]) || undefined;
            if (found) {
              summary[idx][13] = found.value;
            }
          }
        }
        console.log("summary =", summary);
        setViewRequests(summary);
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    if (account && chainId && globalWeb3) {
      getSummary();
    }
    else {
      getAllFromDB();
    }
  }, [account, chainId, globalWeb3])

  const Category = [
    { name: 'See All' },
    { name: 'Defi' },
    { name: 'Education' },
    { name: 'Blockchain' },
    { name: 'Fintech' },
  ]

  const onCopyAddress = () => {
    document.getElementById("hiddenAddressInput").select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  const onClickFavorites = async (idonDB, val) => {
    if (globalWeb3 && account && chainId) {
      await axios({
        method: "post",
        url: `${backendURL}/api/likes/set`,
        data: {
          campaign: idonDB,
          user: account || "",
          value: val,
          chainId: chainId || ""
        }
      }).then((res) => {
        console.log(res.data);
        if (res.data && res.data.code === 0) {
          getSummary();
        }
      }).catch((err) => {
        console.error(err);
        if (err.code && err.code === 4100) NotificationManager.warning("Please unlock your wallet and try again.");
      });
    } else {
      NotificationManager.warning("Please connect your wallet.");
    }
  }


  return (
    <div>
      <HeaderHome />
      <section className="banner py-0 md:py-4" style={{zIndex:"10"}}>
        <div className="container">
          <div className="left md:w-7/12 w-9/12 sm:pl-12 pl-6 pr-3">
            <h1 className='text-white mb-3 md:mb-5 text-xl md:text-xl lg:text-4xl xl:text-4.5xl font-semibold'>A Layer 2 crowdfunding <br /> platform created by <br /> you, for everyone.</h1>
            <NavLink to='/create-campaign' className='createbtn sm:px-4 px-2 text-xs sm:text-xs md:text-lg py-2 pb-3 campaignCard'>Create Campaign</NavLink>
          </div>
        </div>
      </section>

      <section className="main-home py-5 pb-12">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className='text-xl font-bold dark:text-gray-100'>Open Campaigns</h2>
            <div className='hidden md:flex flex-wrap items-start'>
              <div className="py-2 px-6 text-md leading-5 text-slate-800 bg-gradient-secondary font-bold rounded-full dark:text-gray-100 mb-2 md:mb-0">See All</div>
              <div className="relative">
                <button className="sm:ml-3 ml-0 py-2 px-6 text-md leading-5 text-slate-800 bg-gradient-secondary font-bold rounded-full dark:text-gray-100 flex items-center justify-between" type="button" onClick={() => { setDropdown(!dropdown) }}>Categories
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                {/* <!-- Dropdown menu --> */}
                {dropdown ? <>
                  <div id="dropdown" className="absolute  top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                      {Category.map((i, index) => (
                        <li key={index}>
                          <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{i.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </> : ''}
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-wrap gap-2 items-center my-10">
            {Category.map((i, index) => (
              <div className='px-2' key={index}>
                <div className="block text-center py-2 px-4 sm:px-6 text-md leading-5 text-slate-800 bg-gradient-secondary font-bold rounded-full dark:text-gray-100 whitespace-nowrap">{i.name}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 ">
            {ViewRequests && ViewRequests.length > 0 && ViewRequests.map((data, index) => (
              <div className='bg-white px-2 md:px-6 pt-4 md:pt-12 pb-8 campaignCard' key={index} >

                <div className="flex flex-wrap md:justify-between lg:justify-between align-items-center"
                  style={{ userSelect: "none" }}
                >
                  <h5 className='value text-lg'>{campaigns[index]?.toString()?.substring(0, 8) + "..."}</h5>
                  <div className='flex flex-row justify-between gap-3 align-items-center'>
                    <img src={data[13] === false ? HeartBlankIcon : HeartIcon} alt="" onClick={() => { onClickFavorites(data[14], !data[13]) }}
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    />
                    <h4 className='value text-lg'>{data[12]}</h4>
                    <div style={{
                      display: "flex", flexWrap: "wrap", flexDirection: "row",
                      cursor: "pointer",
                      userSelect: "none"
                    }} onClick={() => onCopyAddress()} >
                      <img src="/images/share-button-svgrepo-com.svg"
                        style={{
                          width: "16px",
                          height: "16px",
                          marginTop: "2px"
                        }} alt="tick"
                      />
                      {
                        copied ? <span className='text-blue' >Copied</span> : <span className='text-blue' >Share{" "}</span>
                      }
                    </div>
                  </div>
                  <input type="text" id="hiddenAddressInput"
                    style={{ height: "0px", opacity: "0" }}
                    value={`${window.location.protocol}//${window.location.host}/campaign/${campaigns[index]}`}
                    onChange={() => { }}
                  />
                </div>
                <div className="image relative my-4">
                  <img src={data[7]} alt="item" className="rounded-lg my-3 w-full" />
                  {
                    data[9] === true ?
                      <img src="/images/tick.png" alt="tick" className='absolute right-5 top-5' />
                      : <></>
                  }
                </div>
                <div className="body">
                  <div className="flex flex-wrap md:justify-between">
                    <h4 className='text-blue text-sm title mb-3 '>{data[5]}</h4>
                    <button className='bg-blue-light small-text font-normal px-2 text-xs py-1 mr-3'>{data[11]}</button>
                    {/* <button className='bg-blue-light small-text font-normal text-xs py-1 px-2'>CPG</button> */}
                  </div>
                  <p className='text-blue description mb-3'>{data[6]}</p>
                  <p className='para'>{"Raised"}</p>
                  <h6 className='content mb-5 mt-1 text-sm'>{data[1]?.toString() || "0"}</h6>
                  <NavLink to={`/campaign/${campaigns[index]}`} className="py-2 donatebtn px-4 md:px-12 text-md leading-5 text-black bg-gradient-secondary font-bold">
                    Donate
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}
