import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DarkLightMode from './DarkLightMode';

export default function Header() {
    const [menu, setMenu] = useState(false);
    const [popup, setPopup] = useState(false);
    const [connected, setConnected] = useState(false);


    return (
        <div className='header w-full'>
            <section className="relative overflow-hidden">
                <div className="container bg-tarnsparent">
                    <nav className="flex justify-between py-6">
                        <div className="flex justify-between items-center w-full">
                            <div className="w-3/12">
                                <NavLink className="flex items-center whitespace-nowrap" to="/">
                                    <img className="h-12" src="/images/logo.png" alt="logo" />
                                    <h4 className=' ml-1 font-medium text-xl title text-slate-800 dark:text-gray-100 tracking-widest'>GiveStation</h4>
                                </NavLink>
                            </div>
                            <div className="w-6/12">
                                <ul className="hidden xl:flex xl:justify-end">
                                    <li className="mr-9"><NavLink className={(props) => { return props.isActive ? 'font-bold dark:text-gray-100' : 'text-gray-700  font-bold dark:text-gray-100' }} to="/create-campaign">Create Campaign</NavLink></li>
                                    <li className="mr-9"><NavLink className={(props) => { return props.isActive ? 'font-bold dark:text-gray-100' : 'text-gray-700 font-bold dark:text-gray-100' }} to="/faq">How it works</NavLink></li>
                                </ul>
                            </div>
                            <div className="w-3/12">
                                <div className="hidden xl:flex items-center justify-end">
                                    <button className="py-2 px-4 text-sm leading-5 text-slate-800 bg-gradient-secondary font-bold rounded-full dark:text-gray-100  whitespace-nowrap" onClick={() => {setPopup(!popup)}}>
                                        {connected ? 'Connected' : 'Connect Wallet'}
                                    </button>
                                    <DarkLightMode />
                                </div>
                                
                            </div>
                        </div>
                        <button className="navbar-burger self-center xl:hidden" onClick={() => { setMenu(!menu) }}>
                            <svg width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className="text-gray-800" width="32" height="32" rx="6" fill="currentColor"></rect>
                                <path className="text-gray-800" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="#ffffff"></path>
                            </svg>
                        </button>
                    </nav>
                    {menu ? <>
                        <div className="navbar-menu fixed top-0 left-0 z-50 w-full h-full bg-opacity-50 shadow-lg" onClick={() => { setMenu(!menu) }}>
                            <div className="fixed top-0 left-0 bottom-0 w-full max-w-xs">
                                <nav className="relative h-full overflow-y-auto">
                                    <div className="flex flex-col h-full bg-gray-800">
                                        <div className="flex items-center justify-between py-6 px-6 bg-gray-900">
                                            <NavLink className="flex items-center whitespace-nowrap" to="/">
                                                <img className="h-12" src="/images/logo.png" alt="logo" />
                                                <h4 className=' ml-1 font-medium text-xl title text-white tracking-widest'>GiveStation</h4>
                                            </NavLink>
                                            <button className="text-white" onClick={() => { setMenu(!menu) }}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z" fill="#556987"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="bg-gray-800">
                                            <ul className="md:flex-col md:min-w-full flex flex-col list-none pb-8" onClick={() => { setMenu(!menu) }}>
                                                <li className="items-center hover:bg-primary">
                                                    <NavLink to="/create-campaign" className={(props) => { return props.isActive ? 'capitalize py-2.5 px-6 block text-slate-800 whitespace-nowrap text-md border-b border-gray-700 bg-primary' : 'capitalize py-2.5 px-6 block text-white  hover:text-slate-800 whitespace-nowrap text-md border-b border-gray-700' }}>
                                                    Create Campaign
                                                    </NavLink>
                                                </li>

                                                <li className="items-center hover:bg-primary">
                                                    <NavLink to="/campaigns" className={(props) => { return props.isActive ? 'capitalize py-2.5 px-6 block text-slate-800 whitespace-nowrap text-md border-b border-gray-700 bg-primary' : 'capitalize py-2.5 px-6 block text-white  hover:text-slate-800 whitespace-nowrap text-md border-b border-gray-700' }}>
                                                    How it works
                                                    </NavLink>
                                                </li>
                                            </ul>
                                            <div className="flex flex-wrap px-8">
                                                <div className="w-full flex justify-center">
                                                    <button onClick={() => {setPopup(!popup)}} className="py-2 px-4 text-sm leading-5 text-white bg-gradient-secondary font-bold rounded-full" to="/">
                                                        Connect Wallet
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </nav>

                            </div>
                        </div>
                    </> : ''}

                </div>
            </section>
            { popup ? <>
                <section className="popup fixed w-full top-0 left-0 z-50 min-h-screen flex items-center justify-center">
                    <div className="connect-popup">
                        <div className="popup-head py-12 px-6 flex justify-between items-center">
                            <div className='w-full'>
                                <h4 className='text-white text-xl font-bold text-center'>Connect to Wallet</h4>
                            </div>
                            <div className="closebtn cursor-pointer" onClick={() => { setPopup(!popup) }}>
                                <img src="/images/close.png" alt="close" className='ml-auto' />
                            </div>
                        </div>
                        <div className="px-6">
                            <div className='popup-body px-5 py-5 rounded-xl'>
                                <div className='flex justify-between items-start'>
                                    <h5 className='text-white pop-title font-bold text-lg cursor-pointer' onClick={() => { setConnected(true); setPopup(!popup) }}>Metamask</h5>
                                    <img src="/images/metamask.png" alt="close" className='ml-auto' />
                                </div>
                            </div>
                            <div className="popup-content pt-2 px-5">
                                <div className='flex justify-between items-start py-4'>
                                    <h5 className='text-white pop-title font-bold text-lg cursor-pointer' onClick={() => { setConnected(true); setPopup(!popup) }}>WalletConnect</h5>
                                    <img src="/images/wallet-connect.png" alt="close" className='ml-auto' />
                                </div>
                                <div className='flex justify-between items-start py-4'>
                                    <h5 className='text-white pop-title font-bold text-lg cursor-pointer' onClick={() => { setConnected(true); setPopup(!popup) }}>GiveWallet</h5>
                                    <img src="/images/give-icon.png" alt="close" className='ml-auto' />
                                </div>
                                <div className='flex justify-between items-start py-4'>
                                    <h5 className='text-white pop-title font-bold text-lg cursor-pointer' onClick={() => { setConnected(true); setPopup(!popup) }}>Portis</h5>
                                    <img src="/images/portis.png" alt="close" className='ml-auto' />
                                </div>
                                <div className="connectbtn mt-6 text-center">
                                    <button className='block bg-light-blue text-white px-10 py-2 rounded-xl w-9/12 mx-auto text-lg'>Connect</button>
                                    <p className='my-3 text-xs text-white'>New to Ethereum? <a href="/" className='text-blue-500 ml-1.5 underline underline-offset-2'>Learn more about wallets</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> : ''}
        </div>
    )
}
