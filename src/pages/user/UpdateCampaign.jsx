import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import axios from "axios";
import UserFooter from "../../components/user/UserFooter";
import { chains } from '../../smart-contract/chains_constants';
import { backendURL } from '../../config';
import { useEffect } from 'react';
const CampaignFactory = require("../../smart-contract/build/CampaignFactory.json");
const Category = require("../../config").Category;
const Campaign = require("../../smart-contract/build/Campaign.json");

export default function UpdateCampaign() {
	const [category, setCategory] = useState("Defi");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [dropdown, setDropdown] = useState(false);
	const [idOnDB, setIdOnDB] = useState(null);
	const [summary, setSummary] = useState({});

	const chainId = useSelector(state => state.auth.currentChainId);
	const account = useSelector(state => state.auth.currentWallet);
	const globalWeb3 = useSelector(state => state.auth.globalWeb3);

	const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        console.log("[contribute.jsx] chainId = ", chainId);
        if(account && chainId && globalWeb3 && id)
        {
            const getSummary = async () => {
                try{
                    const factory = new globalWeb3.eth.Contract(
                        CampaignFactory,
                        chains[chainId?.toString()].factoryAddress
                    );
                    let summa = null;
                    if(factory)
                    {
                        summa = await new globalWeb3.eth.Contract(Campaign, id).methods.getSummary().call();         
                    }
                    if(summa !== null)
                    {                        
                        await axios({
                        method: "post",
                        url: `${backendURL}/api/campaign/all`,
                        data: {
                            chainId:chainId || "",
                            address:id
                        }
                        }).then((res)=>{
                            console.log(res.data);
                            if(res.data && res.data.code === 0)
                            {
                                let summaryFromDB = res.data.data[0] || [];
                                if(summaryFromDB !== undefined)
                                {
                                    summa[5] = summaryFromDB.name;
                                    summa[6] = summaryFromDB.description;
                                    summa[7] = summaryFromDB.imageURL;
                                    summa[9] = summaryFromDB.verified;
                                    summa[11] = summaryFromDB.category;
                                    summa[12] = summaryFromDB.raised;
                                    setIdOnDB(summaryFromDB._id);
									setCategory(summaryFromDB.category);
									setDescription(summaryFromDB.description);
									setImageURL(summaryFromDB.imageURL);
                                }
                                console.log("summary =", summa);
                                setSummary(summa);
                            }
                        }).catch((err)=> {
                            console.error(err);    
                        });
                    }
                }
                catch(e)
                {
                    console.error(e);
                }
            }
            getSummary();
        }
        else if(id){
            const getSummaryFromDB = async () => {                 
                await axios({
                    method: "post",
                    url: `${backendURL}/api/campaign/all`,
                    data: {
                        chainId:chainId || "",
                        address:id
                    }
                    }).then((res)=>{
                        console.log(res.data);
                        if(res.data && res.data.code === 0)
                        {   
                            let summa = {};
                            let summaryFromDB = res.data.data[0] || [];
                            if(summaryFromDB !== undefined)
                            {
                                summa[5] = summaryFromDB.name;
                                summa[6] = summaryFromDB.description;
                                summa[7] = summaryFromDB.imageURL;
                                summa[9] = summaryFromDB.verified;
                                summa[11] = summaryFromDB.category;
                                summa[12] = summaryFromDB.raised;
                                setIdOnDB(summaryFromDB._id);
								setCategory(summaryFromDB.category);
								setDescription(summaryFromDB.description);
								setImageURL(summaryFromDB.imageURL);
                            }
                            console.log("summary =", summa);
                            setSummary(summa);
                        }
                    }).catch((err)=> {
                        console.error(err);    
                    });
            }
            getSummaryFromDB();
        }
    }, [account, chainId, globalWeb3, id]);

	const onClickUpdateCampaign = async () => {
		await axios({
			method: "post",
			url: `${backendURL}/api/campaign/update`,
			data: {
				_id: idOnDB,
				description:description,
				imageURL:imageURL,
				category: category,
			}
		}).then((res) => {
			console.log(res.data);
			if (res.data && res.data.code === 0) {
				NotificationManager.success("Camapaign is updated!");
				navigate(`/user/my-projects`);
			}
		}).catch((err) => {
			console.error(err);
		});		
	}


	return (
		<div className="py-20 px-10 wholeWrapper">
			<div className="flex items-center pageHead">
				<h1 className="text-slate-900 dark:text-white font-bold overview">Update your project</h1>
				<div className="accountNo ml-7" style={{ textAlign: "center" }}>
					{account && <h2>{account.toString().substring(0, 6) + "..." + account.toString().substring(38, 42)}</h2>}
				</div>
			</div>
			<section className="form w-10/12 md:w-6/12 mx-auto py-6">
				<div className="form-group mb-6 my-3" 
					// style={{ display: "flex", flexDirection: "row" }}
				>
					<label className="block mb-2 dark:text-gray-100">Category</label>
					<div className="flex flex-wrap">
						<input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary'
							onChange={(e) => { setCategory(e.target.value) }} value={category || ""}
						/>
					</div>
					{/* 
						<div className="block mb-2 dark:text-gray-100">Category</div>
						<div className="relative">
						<button className="sm:ml-3 ml-0 py-2 px-6 text-md leading-5 text-slate-800 bg-gradient-secondary font-bold rounded-full dark:text-gray-100 flex items-center justify-between" type="button"
							onClick={() => { setDropdown(!dropdown) }}
							style={{ minWidth: "200px", textAlign: "center" }}
						> {category || "Select a category"}
							<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
						{
							dropdown ?
								<div id="dropdown" className="absolute  top-12 z-10 bg-white divide-y divide-gray-100 rounded shadow w-60 dark:bg-gray-700">
									<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault"
										style={{ overflowY: "scroll", maxHeight: "300px" }}
									>
										{Category.map((i, index) => (
											<li key={index} onClick={(e) => { setCategory(i || "Defi"); setDropdown(!dropdown) }} value={category || ""}>
												<span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{i}</span>
											</li>
										))}
									</ul>
								</div>
								: ''
						}
					</div> */}
				</div>
				<div className="form-group mb-6 my-3">
					<label className="block mb-2 dark:text-gray-100">Campaign Description</label>
					<div className="flex flex-wrap">
						<textarea type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary'
							onChange={(e) => { setDescription(e.target.value) }} value={description || ""}
						/>
					</div>
				</div>
				<div className="form-group mb-6 my-3">
					<label className="block mb-2 dark:text-gray-100">Image URL</label>
					<div className="flex flex-wrap">
						<input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary'
							onChange={(e) => { setImageURL(e.target.value) }} value={imageURL || ""}
						/>
					</div>
				</div>
				<div className="form-group mb-6 my-3 mt-12 flex justify-center">
					<button className="updateCampaignBtn flex justify-center items-center " onClick={() => { onClickUpdateCampaign() }}>
						<p className='text-slate-800'>Update</p>
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
			</section>
			<UserFooter />

		</div>
	)
}
