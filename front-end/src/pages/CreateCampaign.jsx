import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from '../components/Footer'
import Header from '../components/HeaderHome'
import { chains } from '../smart-contract/chains_constants';
import { backendURL } from '../config';
const CampaignFactory = require("../smart-contract/build/CampaignFactory.json");

export default function CreateCampaign() {
    const [minimum, setMinimum] = useState(0.001);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [target, setTarget] = useState(10);

    const chainId = useSelector(state => state.auth.currentChainId);
    const account = useSelector(state => state.auth.currentWallet);
    const globalWeb3 = useSelector(state => state.auth.globalWeb3);

    const navigate = useNavigate();

    const onClickCreateCampaign = async () => {
        if(globalWeb3)
        {
            let idOnDb = null;        
            await axios({
                method: "post",
                url: `${backendURL}/api/campaign/create`,
                data: {
                    name,
                    description,
                    imageURL,
                    minimum,
                    target,
                    creator:account || "",
                    category:"Defi",
                    address:"",
                    chainId:chainId || ""
                }
            }).then((res)=>{
                console.log(res.data);
                if(res.data && res.data.code === 0)
                {
                    idOnDb = res.data.data._id;
                }
            }).catch((err)=> {
                console.error(err);    
            });
            console.log("idOnDb = ", idOnDb);
            let createdCampaignAddress = null;
            if(idOnDb !== null)
            {
                try{
                    const factory = new globalWeb3.eth.Contract(
                        CampaignFactory,
                        chains[chainId?.toString()].factoryAddress
                    );
                    if(factory)
                    {
                        await factory.methods.createCampaign(
                            globalWeb3.utils.toWei(minimum.toString(), "ether"),                            
                            globalWeb3.utils.toWei(target.toString(), "ether"),
                            idOnDb
                            )
                            .send({
                                from: account, 
                                gas: 3000000
                            });
                        let campaigns = await factory.methods.getDeployedCampaigns().call();
                        console.log(campaigns[campaigns.length-1]);  
                        createdCampaignAddress = campaigns[campaigns.length-1];    
                    }else{
                        console.log("creating new campaign : Invalid factoy instance.");          
                    }
                }
                catch(e)
                {
                    console.error(e);                                
                }
                if(createdCampaignAddress !== null)
                {
                    await axios({
                        method: "post",
                        url: `${backendURL}/api/campaign/update`,
                        data: {                            
                            _id: idOnDb,
                            address: createdCampaignAddress,                           
                        }
                    }).then((res)=>{
                        console.log(res.data);
                        if(res.data && res.data.code === 0)
                        {                                              
                            navigate("/");
                        }
                    }).catch((err)=> {
                        console.error(err);    
                    });
                }
            }            
        }else{
            console.log("Invalid web3");
        }
    }

    const onChangeMinimum = (value) => {
        let previous = minimum;
        if(isNaN(value) === true) setMinimum(previous);
        else setMinimum(Number(value));
    }

    const onChangeTarget = (value) => {
        let previous = minimum;
        if(isNaN(value) === true) setTarget(previous);
        else setTarget(Number(value));
    }

    return (
        <div>
            <Header />
            <section className="heading pt-16 pb-4">
                <h1 className="text-center text-2xl font-bolder dark:text-gray-100">Create a new campaign</h1>
            </section>
            <section className="form w-10/12 md:w-6/12 mx-auto py-6">
                    <div className="form-group mb-6 my-3">
                        <label className="block mb-2 dark:text-gray-100">Minimum Contribution Amount</label>
                        <div className="flex flex-wrap">
                            <input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary sm:w-9/12 md:w-9/12 lg:w-9/12' 
                                onChange={(e) => {onChangeMinimum(e.target.value)}} value={minimum}
                            ></input>
                            <div className='w-full sm:w-2/12 md:w-2/12 lg:w-2/12 sm:mt-0 mt-4'>
                                <button className='ethbtn bg-gradient-primary lg:px-4 px-0 py-3 sm:ml-2 w-full text-white font-bold rounded-lg'>{chainId? chains[chainId.toString()].nativeCurrency : "ETH"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-6 my-3">
                        <label className="block mb-2 dark:text-gray-100">Campaign Name</label>
                        <div className="flex flex-wrap">
                            <input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary' 
                                 onChange={(e) => {setName(e.target.value)}} value={name || ""}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-6 my-3">
                        <label className="block mb-2 dark:text-gray-100">Campaign Description</label>
                        <div className="flex flex-wrap">
                            <input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary' 
                                 onChange={(e)=>{setDescription(e.target.value)}} value={description || ""}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-6 my-3">
                        <label className="block mb-2 dark:text-gray-100">Image URL</label>
                        <div className="flex flex-wrap">
                            <input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 sm:w-11/12 w-full border-0 shadow-secondary' 
                                 onChange={(e)=>{setImageURL(e.target.value)}} value={imageURL || ""}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-6 my-3">
                        <label className="block mb-2 dark:text-gray-100">Target Amount</label>
                        <div className="flex flex-wrap">
                            <input type="text" className='bg-white px-6 py-3 rounded-lg focus:outline-none focus:ring-0 text-slate-800 w-full border-0 shadow-secondary sm:w-19/12 md:w-9/12 lg:w-9/12'
                                onChange={(e) => {onChangeTarget(e.target.value)}} value={target}
                            ></input>
                            <div className='w-full sm:w-2/12 md:w-2/12 lg:w-2/12 sm:mt-0 mt-4'>
                                <button className='ethbtn bg-gradient-primary lg:px-4 px-0 py-3 sm:ml-2 w-full text-white font-bold rounded-lg'>{chainId? chains[chainId.toString()].nativeCurrency : "ETH"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-6 my-3 mt-12">
                        <button className='campaignbtn bg-gradient-primary text-white font-bold sm:w-11/12 w-full text-center rounded-lg py-3 px-4 flex justify-center items-center shadow-primary' 
                            onClick={() => { onClickCreateCampaign() }} 
                        >Create campaign <img src="/images/arrow-right.png" alt="arrow" className='ml-1 h-5' /></button>
                    </div>
            </section>
            <Footer />

        </div>
    )
}
