import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/app.css';
import './assets/css/style.scss';

// import ScrollToTop from './ScrollToTop';
import Home from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import Contribute from './pages/Contribute';
import ViewRequests from './pages/ViewRequests';
import CreateRequest from './pages/CreateRequest';
import FaqOne from './pages/FaqOne';
import Alert from './pages/Alert';
import NotFound from './pages/NotFound';
import VerifyCampaigns from './pages/VerifyCampaigns';

function AppRoutes() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/create-campaign" element={<CreateCampaign />}></Route>
                    <Route path="/campaign/:id" element={<Contribute />}></Route>
                    <Route path="/requests/:id" element={<ViewRequests />}></Route>
                    <Route path="/create-request/:id" element={<CreateRequest />}></Route>
                    <Route path="/faq" element={<FaqOne />}></Route>
                    <Route path="/alert" element={<Alert />}></Route>
                    <Route path="/verify" element={<VerifyCampaigns />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default AppRoutes