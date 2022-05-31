import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';

const ResetPass = () => {
    const router = useRouter();
    const [loading, setLoading]= useState(false)
    const [code, setCode]= useState('')

    useEffect(() =>{
        
       
            setCode(router.query.code)
           
       
    },[router.query.code, code])
    const handleSubmit=async(e) => {
        e.preventDefault();
        setLoading(true)
        const password = e.target.password.value;
        if (password && code) {
            try {
                const res = await axios.post('/api/resetpassword', {code,password});
            if(res.status===200){
    alert('Password reset successfull. You can login now!');
    router.push('/login')
    setLoading(false)
    return;
            }else{
                alert('Unauthorized access denied')
                setLoading(false)
            }
            } catch (error) {
                alert('Unauthorized access denied')
                setLoading(false)
            }
           
        }else{
            alert('Unauthorized access denied')
            setLoading(false)
        }
       
    }


    return (
        <>
             <Header/>
        {loading && <Loading/>}
       

        <div className="login-parent row">
  
  <div className="form-child rounded col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 ">
  <h5 className="text-center fw-bolder pt-3 pb-3">Password Reset</h5>
  
  <form onSubmit={handleSubmit} id="loginForm" className="signin-form">
    

  
    
    <div className="form-group pb-3">
        <input id="password-field" type="password" className="form-control p-2" name='password' required placeholder="Password.." />
      </div>
  
    
   <div className="form-group pt-1">
    <button type="submit" className="form-control btn-submit text-white fw-bold">Confirm</button>
  </div> 
    
  </form>
  
</div>
</div>
        </>
    );
};

export default ResetPass;