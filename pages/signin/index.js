import  { useContext,  useEffect,  useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/header/Header";
import { userContext } from "../_app";
import Loading from "../../components/loading/Loading";
import Head  from "next/head";

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
          
          console.log(displayName, email);
  
  
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
          
      }
      }
    }
    
    return (
        <>
        <Header/>
        {loading && <Loading/>}
       <div className="container register">
  <div className="row">
    <div className="col-md-3 register-left">
      <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt='movingplane' />
      <h3>Welcome</h3>
      <p>Get a NFT slot on the internet, make your presence more wider, grow your business</p>
      
    </div>
    <div className="col-md-9 register-right">
      <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
        <li className="nav-item">
          <a onClick={handleNewUser} className={ !isNewUser? 'active nav-link': "nav-link"} id="home-tab"   role="tab" aria-controls="home" aria-selected="true">Login</a>
        </li>
        <li className="nav-item">
          <a onClick={handleNewUser} className={ isNewUser? 'active nav-link': "nav-link"}  id="profile-tab"   role="tab" aria-controls="profile" aria-selected="false">Register</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <h3 className="register-heading">{isNewUser? 'Create New Account!' : 'Login Here!'}</h3>
          <div className="row register-form">
            <div className="col-md-7 ">
              
              <form onSubmit={handleSignup} id="loginForm">
                  {isNewUser&& 
                  <div className="form-group">
                <input type="text" className="form-control" name="name" placeholder="Name"  />
              </div>}
              <div className="form-group">
                <input type="email" className="form-control" name="email" placeholder="email"  />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" name="password" placeholder="Password"  />
              </div>
              
              <input type="submit" className="btnRegister"  />
            
              </form>
            </div>
            
          </div>
        </div>
        {/* <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <h3 className="register-heading">Create New Account!</h3>
          <div className="row register-form">
            <div className="col-md-7">

              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" defaultValue />
              </div>
              
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" defaultValue />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" defaultValue />
              </div>
            </div>
            
          </div>
        </div> */}
      </div>
    </div>
  </div>
</div>

        </>
    );
};

export default Signin;