import  { useContext,  useEffect,  useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/header/Header";
import { userContext } from "../_app";
import Loading from "../../components/loading/Loading";
import Head  from "next/head";

const Login = () => {
    const router = useRouter();
 
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const [loading, setLoading]= useState(true)
    const [resetEmail, setResetEmail] =  useState(" ")
    const [isNewUser, setUser] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isError, setIsError] = useState({
      emailError: false,
      password: false,
    });
  
    const admin= process.env.ADMIN;
   
  useEffect(() => {
  
    if (localStorage.getItem("email") !== (undefined|| null)) {
      window.location.href ='/';
      return;
    }
    setLoading(false)
  
  }, [])
    
  const handleResetEmail=async (e) => {
    if (resetEmail==='') {
      alert('Please enter your email address')
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post('/api/finduser', {email:resetEmail});
          if(res.status===200){
            const res= await axios.post('/api/mail',{email:resetEmail})
    // console.log('email',res.data);
    if (res.status===200) {
      setResetEmail('');
      alert('Email has been sent for password reset. Please check your inbox/spam.')
      return;
    } 
     else{alert('Internal server error')}
          } 
          else{
            alert(`${email} is not found in database.`)
          }
    } catch (error) {
      alert(`email is not found in database.`)
    }
    
  }
    function handleNewUser() {
      setUser(!isNewUser);
    }
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    async function  handleSignup  (e)  {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const displayName = e.target.name.value;
  
      if (isNewUser) {
        if (validateEmail(email)) {
          setIsError({ emailError: false, password: true });
          
          console.log(displayName, email);
  
  
          // send user details to db for sign up
          try {
            // checking email exists 
            setLoading(true)
            const resemail = await axios.post('/api/emailcheck', {email});
          if(resemail.status===200){
alert('Email already exists');
setLoading(false)
return;
          }
            
            
        } catch (error) {
            console.log(error);
            const res = await axios.post('/api/userRegistration', {email, password, displayName});
            if(res.status===200){
              document.getElementById("loginForm").reset();
  
              setloggedInUser({ email, displayName})
              localStorage.setItem("email", email);
              localStorage.setItem("name", displayName);
  
              if (router.query.top) {
                // setLoading(false)
                router.push({
                  
                    pathname:'/checkout',
                    query: router.query
                });
              }else{window.location.href ='/';}
              
            }
            
        }
  
          
        } else {
          setIsError({ emailError: true, password: true });
        }
      } else {
       
  
        // sign in here
     
  
        try {
            setLoading(true)
          const res = await axios.post('/api/login', {email, password});
          if(res.status===200){
            document.getElementById("loginForm").reset();
            
            {email==='thenftslandofficial@gmail.com' ? setloggedInUser({ email, displayName: res.data.displayName, isAdmin:true}) : 
            setloggedInUser({ email, displayName: res.data.displayName})}
            localStorage.setItem("email", email);
            localStorage.setItem("name", res.data.displayName);
            
            if (router.query.top) {
              {email==='thenftslandofficial@gmail.com' ? 
              router.push({
                pathname:'/addslot',
                query: {...router.query, orderID:'admin'}
            })   :
            router.push({
              pathname:'/checkout',
              query: router.query
          })}
  
            }else{
              window.location.href ='/'
              // setLoading(false)
            }
            // setLoading(false)
          }
          
      } catch (error) {
          console.log(error);
          alert('Invalid username or password')
          setLoading(false)
          
      }
      }
    }
    
    return (
        <>
        <Header/>
        {loading && <Loading/>}
       

        <div className="login-parent row">
  {isReset? 
  <div className="form-child rounded col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 ">
  <h2 className="text-center fw-bolder pt-3 pb-3">{isReset&&isNewUser? 'Sign Up' :'Password Reset'}</h2>
  <div className="btn-parent pt-2 pb-2">
    <button onClick={handleNewUser} type="submit" className={!isNewUser ?'form-btn fw-bold active-bg': 'form-btn fw-bold'}>Reset</button>
    <button onClick={handleNewUser} type="submit" className={isNewUser ? 'form-btn fw-bold active-bg': 'form-btn fw-bold'}>Sign up</button>
  </div>
  <form onSubmit={handleSignup} id="loginForm" className="signin-form">
    

  {isNewUser&& <div className="form-group mt-3 pb-3">
        <input type="text" className="form-control p-2" name='name' required placeholder="Full Name.." />
      </div>}
    <div  className={isNewUser? 'form-group pb-3': 'form-group mt-3 pb-3'}>
      <input onChange={(e)=>setResetEmail(e.target.value)} type="email" className="form-control p-2" value={resetEmail} name='email' required placeholder="Email Address.." />
    </div>
    {isNewUser&& <div className="form-group pb-3">
        <input id="password-field" type="password" className="form-control p-2" name='password' required placeholder="Password.." />
      </div>}
  
    
    {isNewUser? <div className="form-group pt-1">
    <button type="submit" className="form-control btn-submit text-white fw-bold">Signup</button>
  </div> : 
  <div className="form-group pt-1">
    <button onClick={(e)=>handleResetEmail(e)} className="form-control btn-submit text-white fw-bold">Reset</button>
  </div>}
    
  </form>
  {isNewUser ? 
  <p className="text-center pt-3">Already registered? <a onClick={()=>{setIsReset(false); setUser(false)}} className="signup-text cursor-pointer">Signin</a></p>
:
<p className="text-center pt-3">Not a member? <a onClick={handleNewUser} className="signup-text cursor-pointer">Signup</a></p>}

<p className="text-center pt-0">{isNewUser? '': 'Already registered?'} <a onClick={()=>{ setIsReset(!isReset); setUser(false)}} className="signup-text cursor-pointer">{isNewUser? '':'login'}</a></p>
</div>

:

<div className="form-child rounded col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 ">
    <h2 className="text-center fw-bolder pt-3 pb-3">Login Form</h2>
    <div className="btn-parent pt-2 pb-2">
      <button onClick={handleNewUser} type="submit" className={!isNewUser ?'form-btn fw-bold active-bg': 'form-btn fw-bold'}>Login</button>
      <button onClick={handleNewUser} type="submit" className={isNewUser ? 'form-btn fw-bold active-bg': 'form-btn fw-bold'}>Sign up</button>
    </div>
    <form onSubmit={handleSignup} id="loginForm" className="signin-form">
      {isNewUser&& <div className="form-group mt-3 pb-3">
        <input type="text" className="form-control p-2" name='name' required placeholder="Full Name.." />
      </div>}
      <div className={isNewUser? 'form-group pb-3': 'form-group mt-3 pb-3'}>
        <input type="email" className="form-control p-2" name='email' required placeholder="Email Address.." />
      </div>
      <div className="form-group pb-3">
        <input id="password-field" type="password" className="form-control p-2" name='password' required placeholder="Password.." />
      </div>
      
      <div className="form-group pt-1">
      <button type="submit" className="form-control btn-submit text-white fw-bold">{isNewUser? 'Signup' : 'Login' }</button>
    </div>
      
    </form>
    {isNewUser ? 
    <p className="text-center pt-3">Already registered? <a onClick={handleNewUser} className="signup-text cursor-pointer">Signin</a></p>
  :
  <p className="text-center pt-3">Not a member? <a onClick={handleNewUser} className="signup-text cursor-pointer">Signup</a></p>}

<p className="text-center pt-0">{isReset? 'Or you can': 'Forget password?'} <a onClick={()=>{setUser(false); setIsReset(true)}} className="signup-text cursor-pointer">{isReset? 'Login':'reset'}</a></p>
  </div>
}
</div>

        </>
    );
};

export default Login;