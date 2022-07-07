import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { store }  from "./store";
import {Provider} from "react-redux";

function Index() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes/>
      </Provider>
    </>
    )
}

export default Index

ReactDOM.render( 
  <React.StrictMode >
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);