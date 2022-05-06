import { createContext, useEffect, useState } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/header/header.css'
import '../styles/globals.css'
import '../styles/modal.css'
import '../components/Login/login.css'
import './checkout/checkout.css'



export const userContext = createContext();

function MyApp({ Component, pageProps }) {
  
  const [loggedInUser, setLoggedInUser] = useState({email:null, name: null});
  const [selectedSlotinfo, setSelectedSlotinfo] = useState();
  
  useEffect(()=>{ 
 
  //  const email = localStorage.getItem("email");
  //  const name = localStorage.getItem("name");
  //  setLoggedInUser({email: email, displayName: name});
 
 
  }, [])
  return (
    <SSRProvider>
    <userContext.Provider value={[loggedInUser, setLoggedInUser , selectedSlotinfo, setSelectedSlotinfo]}>

  <div > 
  
  <Component {...pageProps} />
  </div>
  
  </userContext.Provider>
  </SSRProvider>
  )
}

export default MyApp
