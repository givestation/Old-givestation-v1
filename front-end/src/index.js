import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { store }  from "./store";
import {Provider} from "react-redux";

function Index() {
  const [loading, setLoading] = useState(true);
  var colorMode = null;

  useEffect(() => {
    
    // setColorMode(localStorage.getItem('color-theme'));  //null, 
    // console.log("color mode : ", typeof localStorage.getItem('color-theme'));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  colorMode = localStorage.getItem('color-theme');
  console.log("color mode : ", colorMode);

  // window.onload(() => {
  //   console.log("color mode : ", colorMode);
  //   document.getElementById("loading_icon_div").style.background("url('../GIF/loader-light.gif') 50% 50% no-repeat #000000");
  // })

  return <>
  {
    loading ? 
    <div className="loader" id="loading_icon_div"
      style={{ background: 
        (colorMode == null || colorMode == "light")? 
        `url('/images/loader-light.gif') 50% 50% no-repeat #ffffff `
        :
        `url("/images/loader-dark.gif") 50% 50% no-repeat #000000 `
      }}
    ></div> 
    : 
    <Provider store={store}>
      <AppRoutes/>
    </Provider>
  }
  </>;
}

export default Index

ReactDOM.render( 
  <React.StrictMode >
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);