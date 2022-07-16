import React from "react";

const UserFooter = () =>
{
    return (
        <div className="footer flex justify-center items-center" style={{ marginTop:"100px" }}>
            <img width={92} height={76} src="/images/logo.svg" alt="logo" />
            <h1 className="text-slate-900 dark:text-white font-bold text-xl ml-16">
            GiveDAO
            </h1>
            <h1 className="text-slate-900 dark:text-white font-bold text-xl ml-12">
            About
            </h1>
            <h1 className="text-slate-900 dark:text-white font-bold text-xl ml-12">
            How it works
            </h1>
        </div>
    )
}

export default UserFooter;
