import './App.css'

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

import BreadCrumb from './components/breadcrumb/BreadCrumb';
import CreateListing from './pages/CreateListing';
import Dashboard from './pages/Dashboard';
import Hosting from './pages/Hosting';
import Listings from './pages/Listings';
import Navbar from './components/Navbar/Navbar'
import PlaceDetails from './pages/PlaceDetails';
import { PlaceProvider } from './store/placeProvider';
import ReactDOM from "react-dom/client";
import TabSlide from './components/TabSlide'
import Trips from './pages/Trips';
import { UserProvider } from './store/userProvider';

function App() {  
  const [path, setPath] = useState()
  const location = useLocation();
  
  useEffect(() => {
    let navContainer = document.getElementById('nav-container')

    if(location.pathname == "/hosting/create-place"){
      navContainer.style.display = "none"
    }
    else{
      navContainer.style.display = "flex"
    }

    window.addEventListener('beforeunload', () => {
      document.body.classList.add('fade-out');
    });
  }, [location.pathname])

  return (
    <>
      <UserProvider>
      <PlaceProvider>
        <BreadCrumb />
        {path !== "/hosting/create-place" && 
          <>
            <TabSlide />
            <Navbar />
          </>
        }
        <Routes>
          <Route path="*" element={<Listings />}/>
          <Route default path="/listings" element={<Listings />} />
          {/* <Route path="/listings" element={<Listings />} /> */}
          <Route path="/listings/:searchparams" element={<Listings />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/trips" element={<Trips />}/>
          <Route path="/hosting" element={<Hosting />}/>
          <Route path="/hosting/create-place" element={<CreateListing />}/>
          <Route path="/place/:placeId" element={<PlaceDetails />} />
        </Routes>
      </PlaceProvider>
      </UserProvider>
    </>
  )
}

export default App
