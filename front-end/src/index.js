import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { store }  from "./store";
import {Provider} from "react-redux";

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  return <>
  {
    loading ? 
    <div className="loader"></div> 
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