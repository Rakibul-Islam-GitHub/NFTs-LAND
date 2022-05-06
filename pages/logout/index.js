import React, { useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { userContext } from '../_app';

const Logout = () => {

    const router = useRouter();
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  
  useEffect(()=>{ 

    localStorage.setItem("email", null);
    localStorage.setItem("name", null);
    setloggedInUser({email: null, name: null});
  
    window.location.href='/';
   }, [])
  
    return (
        <div>
            loading.....
        </div>
    );
};

export default Logout;