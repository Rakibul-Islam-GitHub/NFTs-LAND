import  { useContext,  useEffect,  useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/header/Header";
import { userContext } from "../_app";
import Loading from "../../components/loading/Loading";


const Signin = () => {
    const router = useRouter();
 
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const [loading, setLoading]= useState(true)
  
    const [isNewUser, setUser] = useState(false);
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
          
       
  
  
          // send user details to db for sign up
          try {
            const res = await axios.post('/api/userRegistration', {email, password, displayName});
            if(res.status===200){
              document.getElementById("loginForm").reset();
  
              setloggedInUser({ email, displayName})
              localStorage.setItem("email", email);
              localStorage.setItem("name", displayName);
  
              if (router.query.top) {
                router.push({
                    pathname:'/checkout',
                    query: router.query
                });
              }else{window.location.href ='/';}
              
            }
            
        } catch (error) {
            console.log(error);
            
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
            
            {email===process.env.NEXT_PUBLIC_ADMIN ? setloggedInUser({ email, displayName: res.data.displayName, isAdmin:true}) : 
            setloggedInUser({ email, displayName: res.data.displayName})}
            localStorage.setItem("email", email);
            localStorage.setItem("name", res.data.displayName);
            
            if (router.query.top) {
              {email===process.env.NEXT_PUBLIC_ADMIN ? 
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
          
      }
      }
    }
    
    return (
        <>
        <Header/>
        {loading && <Loading/>}
      

      <div className="login-parent row">
  <div className="form-child col-md-3 col-sm-8">
    <h2 className="text-center fw-bolder pt-3 pb-3">Login Form</h2>
    <div className="btn-parent pt-2 pb-2">
      <button onClick={handleNewUser} type="submit" className={!isNewUser ?'form-btn fw-bold active': 'form-btn fw-bold'}>Login</button>
      <button onClick={handleNewUser} type="submit" className={isNewUser ? 'form-btn fw-bold active': 'form-btn fw-bold'}>Sign up</button>
    </div>
    <form onSubmit={handleSignup} id="loginForm" className="signin-form">
      {isNewUser&& <div className="form-group mt-3 pb-3">
        <input type="text" className="form-control p-2" name='name' required placeholder="Full Name.." />
      </div>}
      <div className="form-group mt-3 pb-3">
        <input type="email" className="form-control p-2" name='email' required placeholder="Email Address.." />
      </div>
      <div className="form-group pb-3">
        <input id="password-field" type="password" className="form-control p-2" name='password' required placeholder="Password.." />
      </div>
      <div className="form-group pt-1">
        <button type="submit" className="form-control btn-submit">Login</button>
      </div>
    </form>
    {isNewUser ? 
    <p className="text-center pt-3">Already registered? <a onClick={handleNewUser} className="signup-text cursor-pointer">Signin</a></p>
  :
  <p className="text-center pt-3">Not a member? <a onClick={handleNewUser} className="signup-text cursor-pointer">Signup</a></p>}
  </div>
</div>

        </>
    );
};

export default Signin;