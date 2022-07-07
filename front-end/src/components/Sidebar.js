import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { createGlobalStyle } from 'styled-components';
import { LoadingSkeleton } from './utils';
// import { getMarketCap } from '../../core/web3';
// import * as selectors from '../../store/selectors';
// import { config } from '../../core/config';
// import { getMagicPriceInWeb3 } from '../../core/web3';
// import { numberWithCommas } from '../utils';

const GlobalStyles = createGlobalStyle`
  .social-icons span {
    text-shadow: none;
    color: #fff !important;
    padding: 5px 10px 8px;
    text-align: center;
    font-size: 22px;
    border-radius: 5px;
    margin: 16px;
  }

  .menu-text {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 16px;
    @media only screen and (max-width: 768px) {
      margin-left: 8px !important;
    }
  }
`;

const path_list = ['', 'dashboard', 'account', 'swap', 'nft_savings', 'magic_ico', 'magic_control/admin'];

const Sidebar = (props) => {
  const [navSelected, setNavSelected] = useState('dashboard');
  const [isAdmin, setAdmin] = useState(false);
  const [magicPrice, setMagicPrice] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [loading, setLoading] = useState(true);

  const web3 = useSelector(selectors.web3State);
  const isMobile = useMediaQuery({ maxWidth: '1024px' });
  const location = useLocation();

  // const initialize = useCallback(async () => {
  //   if (!web3) {
  //     return;
  //   }
  //   setLoading(true);
  //   let nowMagicPrice = 0;
  //   let result = await getMagicPriceInWeb3();
  //   if (result.success) {
  //     nowMagicPrice = result.magicPrice;
  //     setMagicPrice(result.magicPrice);
  //   }
  //   result = await getMarketCap(nowMagicPrice);
  //   if (result.success) {
  //     setMarketCap(result.marketCap);
  //   }
  //   setLoading(false);
  // }, [web3]);

  // useEffect(() => {
  //   let path_name = location.pathname.replace('/', '');
  //   if (!path_list.includes(path_name))
  //     path_name = '';
  //   setNavSelected(path_name);
  //   if (path_name === 'magic_control/admin')
  //     setAdmin(true);
  //   else
  //     setAdmin(false);
  // }, [location]);

  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  return (
    <>
      <GlobalStyles />
      <div
        className={`my-navbar bg-[#1B1E2A] flex-col justify-center z-50 ${(isMobile && !props.isOpen) && 'hide-nav'} ${isMobile ? 'mobile my-border-color border-end border-2' : 'non-mobile'}`}
      >
        {isMobile && (
          <button
            onClick={() => props.setIsOpen(prevState => !prevState)}
            className='btn-sidebar focus:outline-none hover:bg-gray-700'
          >
            <i className="fa-solid fa-xmark-large"></i>
          </button>
        )}
        <div className="navbar-content">
          <div className='logo-img flex flex-col space-y-2 items-center pb-0' style={{ padding: '15px 30px' }}>
            <Link to='/'>
              <img alt='' src={'/img/logo.png'} width={100} style={{ cursor: 'pointer' }} />
            </Link>
            {/* <span className='fs-24 f-century text-green m-0'>{loading || magicPrice === '' ? <LoadingSkeleton /> : `$${numberWithCommas(magicPrice, 4)}`}</span> */}
            <span className='fs-24 f-century text-green m-0'>$0.03</span>
            <p className='fs-14 m-0' style={{ color: '#919BB5' }}><span className='text-white bold'>$MGV</span> PRICE</p>
            {/* <p className='fs-20 text-white'>{loading || marketCap === '' ? <LoadingSkeleton /> : '$' + numberWithCommas(marketCap)}</p>
            <p className='fs-14 m-0' style={{ color: '#919BB5' }}>MARKET CAP</p> */}
          </div>

          <nav>
            <hr className="menu-item" />
            {!isAdmin ? (
              <>
                {/* <a
                  href='https://'
                  className={`menu-item ${navSelected === 'home'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-light fa-rocket fs-20"></i>
                    <div className='menu-text text-lg'>Home</div>
                  </div>
                </a> */}
                <Link
                  to='/'
                  className={`menu-item ${navSelected === ''
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-house-chimney fs-20"></i>
                    <div className='menu-text text-lg'>Home</div>
                  </div>
                </Link>
                <Link
                  to='/magic_ico'
                  className={`menu-item ${navSelected === 'magic_ico'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-aperture fs-20"></i>
                    <div className='menu-text text-lg'>Presale</div>
                  </div>
                </Link>
                <Link
                  to='/dashboard'
                  className={`menu-item ${navSelected === 'dashboard'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-grid-2 fs-20"></i>
                    <div className='menu-text text-lg'>Dashboard</div>
                  </div>
                </Link>
                <Link
                  to='/account'
                  className={`menu-item ${navSelected === 'account'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-chart-pie-simple fs-20"></i>
                    <div className='menu-text text-lg'>Your Account</div>
                  </div>
                </Link>
                <Link
                  to='/swap'
                  className={`menu-item ${navSelected === 'swap'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-shuffle fs-20"></i>
                    <div className='menu-text text-lg'>Buy / Swap</div>
                  </div>
                </Link>
                {/* <Link
                  to='/dashboard'
                  onClick={() => toast.warning('Comming Soon...')}
                  className={`menu-item ${navSelected === 'nft_savings'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-hexagon-vertical-nft fs-20"></i>
                    <div className='menu-text text-lg'>Magic NFT Savings</div>
                    <div className="new-chip">COMMING</div>
                  </div>
                </Link>
                <Link
                  to='/magic-bank'
                  className={`menu-item ${navSelected === 'magic-bank'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <img src="/img/bank.png" alt='' />
                    <div className='text-lg'>Magic Bank</div>
                  </div>
                </Link>
                <Link
                  to='/resurrection'
                  className={`menu-item ${navSelected === 'resurrection'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <img src="/img/nft.png" alt='' width="22px" />
                    <div className='text-lg'>100Days Resurrection</div>
                  </div>
                </Link> */}
              </>
            ) : (
              <>
                {/********************** ADMIN ****************************/}
                <Link
                  to='/magic_control/admin'
                  className={`menu-item ${navSelected === 'magic_control/admin'
                    ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                    : 'block py-2 px-4 transition duration-200  hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6'>
                    <i className="fa-solid fa-grid-2 fs-20"></i>
                    <div className='text-lg'>Administrator</div>
                  </div>
                </Link>
                {/********************** ADMIN ****************************/}
              </>
            )}
            <hr className="menu-item" />
            <a
              href={`https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=${config.MagicAddress}`}
              rel="noreferrer"
              target='_blank'
              className={`menu-item ${navSelected === 'chart'
                ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                : 'block py-2 px-4 transition duration-200  hover:text-white'
                }`}
            >
              <div className='flex space-x-6 align-items-center'>
                <i className="fa-solid fa-chart-line fs-20"></i>
                <div className='menu-text text-lg'>Dex Charts</div>
              </div>
            </a>
            <a
              href="/whitepaper.pdf"
              rel="noreferrer"
              target='_blank'
              className={`menu-item ${navSelected === 'docs'
                ? 'menu-active-item block py-2 px-4 transition duration-200  text-white'
                : 'block py-2 px-4 transition duration-200  hover:text-white'
                }`}
            >
              <div className='flex space-x-6 align-items-center'>
                <i className="fa-solid fa-gear fs-20"></i>
                <div className='menu-text text-lg'>Docs</div>
              </div>
            </a>
            <div className="flex flex-column">
              <div className="sidebar-social-icons social-icons flex justify-content-center">
                <a href="https://t.me/magicventures" target="_blank" rel="noreferrer"><i className="fa-brands fa-telegram"></i></a>
                <a href="https://twitter.com/MagicVenture_io" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://discord.gg/93JbgmYsNt" target="_blank" rel="noreferrer"><i className="fa-brands fa-discord"></i></a>
              </div>
            </div>
          </nav>
        </div>
        <div className='align-self-center text-white' align="center">
          <p>Copyright © 2022<br />Magic Ventures, LLC</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
