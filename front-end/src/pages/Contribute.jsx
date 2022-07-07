import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Footer from '../components/Footer';
import Header from '../components/HeaderHome';
import { chains } from '../smart-contract/chains_constants';
const CampaignFactory = require("../smart-contract/build/CampaignFactory.json");
const Campaign = require("../smart-contract/build/Campaign.json");

export default function Contribute() {
    const history = useNavigate();
    const [summary, setSummary]  = useState({});
    const [popup, setPopup] = useState(false);
    const [donationAmount, setDonationAmount] = useState(0);
    
    const chainId = useSelector(state => state.auth.currentChainId);
    const account = useSelector(state => state.auth.currentWallet);
    const globalWeb3 = useSelector(state => state.auth.globalWeb3);

    const {id} = useParams();

    useEffect(() => {
        console.log("[contribute.jsx] chainId = ", chainId);
        console.log("[contribute.jsx] id = ", id);
        if(account && chainId && globalWeb3 && id)
        {
            const getSummary = async () => {
                try{
                    const factory = new globalWeb3.eth.Contract(
                        CampaignFactory,
                        chains[chainId?.toString()].factoryAddress
                    );
                    if(factory)
                    {
                        let summary = await new globalWeb3.eth.Contract(Campaign, id).methods.getSummary().call();
                        setSummary(summary);
                        console.log("[contribute.jsx] summary = ", summary);
                    }
                }
                catch(e)
                {
                    console.error(e);
                }
            }
            getSummary();
        }
    }, [account, chainId, globalWeb3, id]);

    const onChangeDonationAmount = (value) => {
        let previous = donationAmount;
        if(isNaN(value) === true) setDonationAmount(previous);
        else setDonationAmount(value); 
    }

    const onClickContribute = async () => {
        if(donationAmount>0  && globalWeb3)
        {
            try{
                await new globalWeb3.eth.Contract(Campaign, id).methods.contibute().send({
                    from: account,
                    gas: 3000000,
                    value: globalWeb3.utils.toWei(donationAmount, "ether"),
                })
                setPopup(!popup);
            }catch(e)
            {
                console.error(e);
            }
        }
    }

    return (
        <div>
            <Header />

            <section className="pt-24 pb-16">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="left">
                            <p className='flex items-center text-sm dark:text-gray-100'>
                                <a target="_blank" rel="noreferrer noopener" 
                                    href={`${chains[chainId?.toString()]?.blockScanUrl}address/${id}`}>View on block scan website</a>
                                <span className='ml-2'><img className='w-2/3' src="/images/blue-arrow.png" alt="blue arrow" /></span>
                            </p>
                            <img className='my-3 rounded-3xl w-full' src={summary[7] || "/images/avengers.png"} alt="avengers" />
                            <h4 className='font-bold mt-12 text-lg dark:text-gray-100'>{summary[5] || ""}</h4>
                            <h6 className='my-2.5 text-md dark:text-gray-100'>Description</h6>
                            <p className='mb-3 text-justify dark:text-gray-100'>{summary[6] || ""}</p>
                            <div className="flex flex-wrap items-end mt-6">
                                <div className='w-full sm:w-3/12 md:3/12'>
                                    <label className='mb-3 block text-sm text-center dark:text-gray-100'>Minimum  <br /> Contribution Amount</label>
                                    <input type="text" disabled className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary' 
                                        value={summary[0]>0? globalWeb3?.utils.fromWei(summary[0], "ether") : "0, Become a Donor 😄"}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className='w-full sm:w-8/12 md:8/12 sm:ml-5'>
                                    <label className='mb-3 block text-sm text-center dark:text-gray-100'>Creator’s wallet address</label>
                                    <input type="text" disabled className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary' 
                                        value={summary[4] || ""}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                            <div className="flex items-end mt-10">
                                <div className='w-full sm:w-3/12 md:3/12 pr-4'>
                                    <label className='mb-5 block text-sm text-center dark:text-gray-100'>Total Requests</label>
                                    <div className='w-16 mx-auto'>
                                        <input type="text" disabled className='bg-white px-6 py-5 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary' 
                                            value={summary[2] || 0}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                                <div className='w-full sm:w-3/12 md:3/12'>
                                    <label className='mb-5 block text-sm text-center dark:text-gray-100'>Total Approvers</label>
                                    <div className='w-16 mx-auto'>
                                        <input type="text" disabled className='bg-white px-6 py-5 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary' 
                                            value={summary[3] || 0}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right pl-0 md:pl-12">
                            <h4 className='font-bold my-6 text-lg value dark:text-gray-100'>Campaign Balance</h4>
                            <div className="range my-1">
                                <input type="range" name="range" id='range' min="0" max={summary[8]>=0? globalWeb3?.utils.fromWei(summary[8], "ether").toString() : "0"} className='w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer' 
                                    value={summary[1]>=0? globalWeb3?.utils.fromWei(summary[1], "ether").toString() : "0"}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <h4 className='my-6 text-lg value dark:text-gray-100'>{summary[1]>=0? globalWeb3?.utils.fromWei(summary[1], "ether") : "0"} {chains[chainId?.toString()]?.nativeCurrency}</h4>
                                <h4 className='my-6 text-lg value dark:text-gray-100'>Target of {summary[8]>=0? globalWeb3?.utils.fromWei(summary[8], "ether") : "0"} {chains[chainId?.toString()]?.nativeCurrency}</h4>
                            </div>
                            <div className="form mt-5">
                                <input type="text" className='bg-white mb-7 px-6 py-6 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary' placeholder='Enter amount' 
                                    onChange={(e) => {onChangeDonationAmount(e.target.value)}}
                                />
                                <button className='campaignbtn bg-gradient-primary text-white font-bold w-full text-center rounded-lg py-4 px-4 flex justify-center items-center shadow-primary' 
                                    onClick={() => { onClickContribute(); }}
                                >Contribute</button>
                            </div>
                            <div className="note mt-36 py-2 px-3 bg-primary rounded mb-9">
                                <div className='border-l-4 border-blue-600'>
                                    <p className='pl-4 text-md'>Click the button below to see how funds are being used <br />and if you are a contributor, you can also approve <br /> the withdrawal request.</p>
                                </div>
                            </div>
                            <button className='campaignbtn bg-gradient-primary text-white font-bold w-full text-center rounded-lg py-4 px-4 flex justify-center items-center shadow-primary text-lg'
                                onClick={() => {history(`/requests/${id}`)}}
                            >View Withdrawal Requests</button>
                        </div>
                    </div>
                </div>
            </section>

            {popup ? <>
                {/* popup  */}
                <section className="popup fixed w-full top-0 left-0 z-50 min-h-screen flex items-center justify-center">
                    <div className="popup-other">
                        <div className="container">
                            <div className="connect-popup mx-auto">
                                <div className="popup-head py-6 px-6 flex justify-between items-center">
                                    <div className="closebtn cursor-pointer" onClick={() => { setPopup(!popup); history('/') }}>
                                        <img src="/images/closebtn.png" alt="close" className='ml-auto' />
                                    </div>
                                </div>
                                <div className="px-3 text-center">
                                    <div className='flex justify-center'>
                                        <img src="/images/casual.png" alt="casual" className='mx-auto' />
                                    </div>
                                    <h6 className='text-sm md:text-2xl mt-3 mb-1 text-white font-bold'>Thank you for contributing to this campaign!</h6>
                                    <p className='text-xs md:text-lg mb-5 text-white'>You successfully donated {donationAmount>=0? donationAmount : "0"} {chains[chainId?.toString()]?.nativeCurrency} </p>
                                    <div className="flex w-11/12 md:w-8/12 mx-auto input-group">
                                        <input type="text" id="website-admin" className="rounded-none rounded-l-xl bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-xs border-gray-300 py-3 px-5 placeholder-gray-800" placeholder="Share your success on Twitter" />
                                        <button className="inline-flex items-center text-sm text-white bg-light-blue rounded-r-xl border-0 border-r-0 px-4 md:px-9 py-3 font-medium">
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> : ''}

            <Footer />
        </div>
    )
}
