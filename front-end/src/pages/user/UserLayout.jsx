import React, {  useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/user/Sidebar';
import HeaderUser from '../../components/user/HeaderUser';
import '../../assets/css/user/style.scss'

export default function UserLayout() {



  useEffect(() => {

    
  }, [])

  return (
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
        {/* <!-- sidebar menu --> */}
        <Sidebar />
        {/* <!-- main content --> */}
        <div className="main-content relative md:ml-80 transition-all duration-300">
         
          <div className="relative px-10">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  )
}
