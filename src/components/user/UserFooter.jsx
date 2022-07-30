import React from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from 'react-responsive';
import { NavLink } from "react-router-dom";

const UserFooter = ({ style }) =>
{
    const navigate = useNavigate();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    
    return (
        <div className="footer flex justify-center items-center" style={{ ...style }}>
            <NavLink className="handcursor  dark:bg-slate-900' " to="/">
                <img width={92} height={76} className="handCursor" src="/images/logo.png" alt="logo" />
            </NavLink>
            <a className="handcursor  dark:bg-slate-900" href="ipfs://bafybeigoqsn4s5hnr32olfj7tqrqwz2lejmby4y5to75gnzpvdlm23g76a/#/givestation.eth" target="_blank">
                <h1 className="handCursor text-slate-900 dark:text-white font-bold text-xl ml-16">
                GiveDAO
                </h1>
            </a>
            {isTabletOrMobile !== true && 
                <h1 className="handCursor  dark:bg-slate-900' text-slate-900 dark:text-white font-bold text-xl ml-12">
                About
                </h1>
            }
        </div>
    )
}

export default UserFooter;
