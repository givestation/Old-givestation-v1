import React, {useState} from "react";
import { useEffect } from "react";
import { useSelector ,  } from 'react-redux';
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { backendURL } from "../../config";
import UserFooter from "../../components/user/UserFooter";
import overviewImage from "./assets/overviewImage.svg";
import { chains } from "../../smart-contract/chains_constants";
const ERC20Abi = require("../../smart-contract/build/ERC20.json");

export default function Overview() {
  const overviewData = [
    {
      id: 1,
      cardName: "DONATIONS",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.09 6.98002C20.24 6.04002 18.82 5.57002 16.76 5.57002H16.52V5.53002C16.52 3.85002 16.52 1.77002 12.76 1.77002H11.24C7.48004 1.77002 7.48004 3.86002 7.48004 5.53002V5.58002H7.24004C5.17004 5.58002 3.76004 6.05002 2.91004 6.99002C1.92004 8.09002 1.95004 9.57002 2.05004 10.58L2.06004 10.65L2.16004 11.7C2.17004 11.71 2.19004 11.73 2.21004 11.74C2.54004 11.96 2.88004 12.18 3.24004 12.38C3.38004 12.47 3.53004 12.55 3.68004 12.63C5.39004 13.57 7.27004 14.2 9.18004 14.51C9.27004 15.45 9.68004 16.55 11.87 16.55C14.06 16.55 14.49 15.46 14.56 14.49C16.6 14.16 18.57 13.45 20.35 12.41C20.41 12.38 20.45 12.35 20.5 12.32C20.96 12.06 21.39 11.78 21.81 11.47C21.83 11.46 21.85 11.44 21.86 11.42L21.9 11.06L21.95 10.59C21.96 10.53 21.96 10.48 21.97 10.41C22.05 9.40002 22.03 8.02002 21.09 6.98002ZM13.09 13.83C13.09 14.89 13.09 15.05 11.86 15.05C10.63 15.05 10.63 14.86 10.63 13.84V12.58H13.09V13.83ZM8.91004 5.57002V5.53002C8.91004 3.83002 8.91004 3.20002 11.24 3.20002H12.76C15.09 3.20002 15.09 3.84002 15.09 5.53002V5.58002H8.91004V5.57002Z"
            fill="white"
          />
          <path
            opacity="0.4"
            d="M20.5 12.3C20.45 12.33 20.4 12.36 20.35 12.39C18.57 13.43 16.6 14.13 14.56 14.47C14.48 15.43 14.06 16.53 11.87 16.53C9.68003 16.53 9.26003 15.44 9.18003 14.49C7.27003 14.19 5.39003 13.56 3.68003 12.61C3.53003 12.53 3.38003 12.45 3.24003 12.36C2.88003 12.16 2.54003 11.94 2.21003 11.72C2.19003 11.71 2.17003 11.69 2.16003 11.68L2.77003 18.19C2.98003 20.18 3.80003 22.23 8.20003 22.23H15.82C20.22 22.23 21.04 20.18 21.25 18.18L21.88 11.4C21.87 11.42 21.85 11.44 21.83 11.45C21.4 11.76 20.96 12.05 20.5 12.3Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 2,
      cardName: "AMOUNT DONATED",
      svg: (
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.949 10.5396C14.3802 10.5396 17.31 11.0836 17.31 13.2604C17.31 15.4362 14.399 16 10.949 16C7.51785 16 4.58809 15.456 4.58809 13.2802C4.58809 11.1034 7.49904 10.5396 10.949 10.5396ZM16.4351 9.22888C17.7468 9.20456 19.1571 9.38468 19.6782 9.51257C20.7823 9.72962 21.5084 10.1727 21.8093 10.8166C22.0636 11.3453 22.0636 11.9586 21.8093 12.4864C21.349 13.4851 19.8654 13.8058 19.2887 13.8886C19.1696 13.9066 19.0738 13.8031 19.0864 13.6833C19.3809 10.9157 17.0377 9.60353 16.4315 9.30183C16.4055 9.28832 16.4002 9.2676 16.4028 9.255C16.4046 9.24599 16.4154 9.23158 16.4351 9.22888ZM5.31858 9.22701L5.5656 9.22924C5.5853 9.23194 5.59515 9.24635 5.59694 9.25446C5.59962 9.26796 5.59425 9.28778 5.56918 9.30219C4.9621 9.60389 2.61883 10.9161 2.91342 13.6827C2.92595 13.8034 2.83104 13.9061 2.71195 13.889C2.13531 13.8061 0.651629 13.4855 0.191392 12.4867C-0.0637974 11.9581 -0.0637974 11.3457 0.191392 10.817C0.492248 10.1731 1.21752 9.72998 2.32156 9.51203C2.84358 9.38504 4.25294 9.20492 5.5656 9.22924L5.31858 9.22701ZM10.949 0C13.2851 0 15.1583 1.88227 15.1583 4.23285C15.1583 6.58253 13.2851 8.4666 10.949 8.4666C8.61292 8.4666 6.73974 6.58253 6.73974 4.23285C6.73974 1.88227 8.61292 0 10.949 0ZM16.6634 0.705896C18.9198 0.705896 20.6918 2.84123 20.0883 5.21974C19.6809 6.82102 18.2062 7.88463 16.5631 7.8414C16.3984 7.8369 16.2363 7.82159 16.0796 7.79457C15.9659 7.77476 15.9086 7.64597 15.973 7.55051C16.5998 6.62288 16.9571 5.50703 16.9571 4.30922C16.9571 3.05918 16.5667 1.8938 15.8889 0.938252C15.8674 0.908532 15.8513 0.862601 15.8728 0.828378C15.8907 0.800459 15.9238 0.78605 15.9551 0.778845C16.1835 0.732013 16.4181 0.705896 16.6634 0.705896ZM5.33593 0.705806C5.58127 0.705806 5.81586 0.731923 6.04509 0.778755C6.07553 0.78596 6.10956 0.80127 6.12746 0.828288C6.14806 0.862511 6.13284 0.908442 6.11135 0.938162C5.43353 1.89371 5.04313 3.05909 5.04313 4.30913C5.04313 5.50694 5.4004 6.62279 6.02718 7.55042C6.09165 7.64588 6.03434 7.77467 5.92063 7.79448C5.76304 7.8224 5.60186 7.83681 5.43711 7.84131C3.79404 7.88454 2.31932 6.82093 1.91191 5.21965C1.30751 2.84114 3.07951 0.705806 5.33593 0.705806Z"
            fill="#EBEDF7"
          />
        </svg>
      ),
    },
    {
      id: 3,
      cardName: "CAMPAIGNS",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 1.5H1.5V22.5H12V12H22.5V1.5Z" fill="white" />
          <path d="M22.5 15H15V22.5H16.5L22.5 16.5V15Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 4,
      cardName: "GIVEPOINTS",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 4.8V0H7.5C9.98528 0 12 2.14903 12 4.8C12 2.14903 14.0147 0 16.5 0H19.5V4.8H24V9.6H0V4.8H4.5Z"
            fill="#F7F0EA"
          />
          <path d="M1.5 12.8H10.5V24H1.5V12.8Z" fill="#F7F0EA" />
          <path d="M22.5 12.8H13.5V24H22.5V12.8Z" fill="#F7F0EA" />
        </svg>
      ),
    },
  ];

  const chainId = useSelector(state => state.auth.currentChainId);
  const account = useSelector(state => state.auth.currentWallet);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);
  const [ statistics, setStatistics ] = useState([0,0,0,0]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getCountsInfo = async () => {
      if(account && globalWeb3)
      {      
        await axios({
          method: "post",
          url: `${backendURL}/api/donation/getDonationCountsOfUser`,
          data: {
              user: account || "",
              chainId:chainId || ""
          }
        }).then((res)=>{
            console.log(res.data);
            if(res.data && res.data.code === 0)
            {
              let temAry = statistics;
              temAry[0] = res.data.data;
              setStatistics(temAry);
            }
        }).catch((err)=> {
            console.error(err);    
        });
      }
      await axios({
        method: "post",
        url: `${backendURL}/api/donation/getTotalDonatedAmountsOfUser`,
        data: {
            user: account  || "",
            chainId:chainId || ""
        }
      }).then((res)=>{
          console.log(res.data);
          if(res.data && res.data.code === 0)
          {
            let temAry = statistics;
            temAry[1] = res.data.data;
            setStatistics(temAry);
          }
      }).catch((err)=> {
          console.error(err);    
      });      
      await axios({
        method: "post",
        url: `${backendURL}/api/campaign/getCampaignCountsOfUser`,
        data: {
            user: account || "",
            chainId:chainId || ""
        }
      }).then((res)=>{
          console.log(res.data);
          if(res.data && res.data.code === 0)
          {
            let temAry = statistics;
            temAry[2] = res.data.data;
            setStatistics(temAry);
          }
      }).catch((err)=> {
          console.error(err);    
      });      
      const givePoint = new globalWeb3.eth.Contract(
        ERC20Abi,
        chains[chainId?.toString()]?.givePointAddress
      );
      if(givePoint)
      {
        try{        
          let gpBalance = await givePoint.methods.balanceOf(account).call() || 0;        
          let temAry = statistics;
          temAry[3] = globalWeb3.utils.fromWei(gpBalance.toString(), "ether");    
          setStatistics(temAry);
        }catch(err)
        {
          console.error(err);    
        }
      }else{
        console.log("Invalid GivePoint");
      }
    }
    getCountsInfo();
  }, [account, globalWeb3])

  return (
    <div>
      <div className="py-20 px-10 wholeWrapper">
        <div className="flex items-center pageHead">
          <h1 className="text-slate-900 dark:text-white font-bold overview">Overview</h1>
          <div className="accountNo ml-7" style={{textAlign:"center"}}>
            {account && <h2>{account.toString().substring(0, 6)+"..."+account.toString().substring(38, 42)}</h2>}
          </div>
        </div>

        <div className="cardWrapper flex justify-between gap-x-4">
          {overviewData.map((e, index) => {
            return (
              <div className="oveviewCards w-full" key={e.id}>
                <div className="flex justify-between items-center">
                  <h1 className="text-white font-bold text-lg">{e.cardName}</h1>
                  <div>{e.svg}</div>
                </div>
                <h1 className="count">{statistics[index]}</h1>
              </div>
            );
          })}
        </div>
        <div className="flex gap-x-24 welcomeSect">
            <img src={overviewImage} alt="" />

            <div className="flex flex-col items-center justify-center w-2/5 overDesc">
              <h1 className="giveHeading">Welcome to GiveStation</h1>
              <p className="giveP text-slate-900 dark:text-white">
                A layer 2 crowdfunding platform that reward you for donating.
              </p>
              <button className="exploreBtn" onClick={() => { navigate("/") }}>Explore Campaigns</button>
            </div>
          </div>
      </div>      

      <UserFooter/>
    </div>
  );
}
