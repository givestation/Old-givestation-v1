import React, {  useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/user/Sidebar';
import HeaderUser from '../../components/HeaderHome';
import '../../assets/css/user/style.scss'
import { useState } from 'react';

export default function UserLayout() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const [loading, setLoading] = useState(true);
  var colorMode = null;

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  colorMode = localStorage.getItem('color-theme');

  return (<>
    {    
    loading ? 
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height: "100vh", 
      background:
        (colorMode == null || colorMode == "light")? 
        "white" : "black"
    }}>
    <div className="loader"
      style={{ backgroundImage:
        (colorMode == null || colorMode == "light")? 
          `url('/images/loader-light.gif')`
          :
          `url('/images/loader-dark.gif')`
      }}
    ></div> 
    </div>
    : 
    <div>
      <section className="admin-layout bg-blur dark:bg-blur overflow-hidden min-h-screen" id="admin">
        {/* blur gridient blue */}
        <div className="radial-gradient fixed -right-3 top-0"></div>
        <div className="radial-gradient fixed -left-3 top-0"></div>
        <div className="radial-gradient fixed -right-3 bottom-0"></div>
        {/* headerHome */}
        <header className='hidden md:block'>
            <HeaderUser/>   
        </header>
        <div style={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between"
        }}>
          {/* <!-- sidebar menu --> */}
          <Sidebar />
          {/* <!-- main content --> */}
          <div className="relative px-10">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  }
  </>)
}
