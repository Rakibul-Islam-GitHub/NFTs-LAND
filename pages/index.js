import Head from 'next/head'
import Link from 'next/link';
import axios from "axios";
import Script from 'next/script'
import Header from '../components/header/Header'
import {  Form, Button } from "react-bootstrap";
import { Router, useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { userContext } from './_app'
import Footer from '../components/footer/Footer';
import Loading from '../components/loading/Loading';
const { MongoClient, ServerApiVersion } = require('mongodb');


export default function Home(props) {
  const slots= JSON.parse(props.orders);
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  const [selectedSlotinfo, setSelectedSlotinfo] = useContext(userContext);
  const [loading, setLoading]= useState(false);
  const [assignuser, setAssignuser] = useState(false);
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN);
  const router = useRouter()

  const handleAssign=()=>{
setAssignuser(!assignuser)
setEmail(process.env.NEXT_PUBLIC_ADMIN)
  }
  const handleProceed= async (e) => {
    console.log(email);
    e.preventDefault();
    const selectedSlotDetails= {
      left: e.currentTarget.getAttribute('x'),
      top: e.currentTarget.getAttribute('y'),
      hight: e.currentTarget.getAttribute('imghight'),
      width: e.currentTarget.getAttribute('imgwidth'),
      slot: e.target.slot
    }
    setSelectedSlotinfo({});
    setSelectedSlotinfo(selectedSlotDetails);

    if (localStorage.getItem('email')===process.env.NEXT_PUBLIC_ADMIN) {
      
      try {
        // setLoading(true)
        const res = await axios.post('/api/finduser', {email});
          if(res.status===200){
            await router.push({
              pathname:'/assignslot',
              query: {...selectedSlotDetails, orderID:email}
          }) 
          return;
          }else{
            alert(`${email} is not found in database. please add user first`)
          }
      } catch (error) {
        // setLoading(flase)
        alert(`${email} is not found in database. please add this user first`)
        return;
      }
      
    }
    router.push({
      pathname: '/checkout',
      query: selectedSlotDetails
  })
  }
  
  
  return (
    <div >
      <Head>
        <title>Book Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        
        <link rel="icon" href="/favicon.png" />
        {/* <link href="http://fonts.cdnfonts.com/css/minecraft-3" rel="stylesheet"/> */}
                
      </Head>
      <Script src="/js/script.js" ></Script>
      
      
      {/* <div className="preloader"></div> */}
      <div className='header-section'>
        
        <Header/>
  
      </div>

      {loading && <Loading/>}
  
      <div className="home-main-body">
      <div className="preloader"></div>
      <p className="notice"></p>
 
      {/* invalid slot selection modal */}
      <div id="myModal" className="modal">
   <div className="modal-content">
    <div className="modal-header">
      
      <h4 className="modal-header-text">Invalid slot selecion</h4>
      <span className="close">&times;</span>
    </div>
    <div className="modal-body">
      <p id='modal-msg'>Your selected slot(s) are invalid. Please select adjacent row/column.</p>
      
    </div>
    <div className="modal-footer">
      
    </div>
  </div>
   </div>
   {/* modal end */}

   {/* order proceed modal */}
   <div id="proceedModal" className="proceedModal">
   <div className="modal-content">
    <div className="modal-header">
      
      <h4 className="modal-header-text proceed-order">Proceed Your Order</h4>
      <span className="proceedclose">&times;</span>
    </div>
    <div className="modal-body">
      <p id='proceed-modal-msg'> </p>
      <p id='img-size'></p>
    </div>

{loggedInUser.email===process.env.NEXT_PUBLIC_ADMIN &&
 <div className='text-center user-assign'>
 <p className="text-center pt-3">{assignuser? `Don't want to assign?` :'Assign to another user?'} <a onClick={handleAssign} className="signup-text cursor-pointer">click here</a></p>
 {assignuser && <Form.Group className='mb-2' controlId="exampleForm.ControlInput1">
                 {/* <Form.Label>User Email</Form.Label> */}
                 <Form.Control onChange={(e) =>setEmail(e.target.value)} type="text" required placeholder="enter user email.."  name="email" />
             </Form.Group>}
 </div>
}
   


    <div className="proceed-modal-footer">
    
     
      <button onClick={handleProceed} id='proceedbtn' className="btn proceedbtn">Proceed</button>
    
    </div>
  </div>
   </div>
   {/* modal end */}
        
          <div id='slot-wrapper' className="slot-wrapper mb-5">

          <p className="notice">Double click on any blank space after selecting your desire slot(s)</p>

          
       {slots.map( (slot)=> {
         return(
           
           <div key={slot._id.toString()} className="slot-img">
           <div className="hover-div" style={{top:slot.slotdetails.top-100+'px', left:(slot.slotdetails.left-80)+'px'}}>
             <p className="slot-num">Slot No. {slot.slotdetails.slot}</p>
             <img  src={slot.img} alt={slot.title} style={{maxHeight:'110px', width:'210px' }} />
         <h5 className="slot-title">{slot.title}</h5>
         <p className="slot-url">Link: <a href={slot.url}>Click Here</a> </p>
       </div>

       <img  className='slotimg' src={slot.img} height={slot.slotdetails.hight} width={slot.slotdetails.width} alt="slot-image" 
           style={{position: 'absolute', top: slot.slotdetails.top+'px', left: slot.slotdetails.left+'px', objectFit:'fill', height:slot.slotdetails.hight+'px', width:slot.slotdetails.width+'px', zIndex:'1'}}
           />
           </div>
           
          

         )
      })}

     
        
        
          </div>


      </div>
      
     
     

      {/* <footer className='footer flex-column d-flex align-items-center justify-content-center'>
       <p className='m-0 d-flex align-items-center'>&copy;All right reserved 2022</p>
       
       <p className='m-0 d-flex align-items-center'>  <Link className=' web-credit' href='https://github.com/Rakibul-Islam-GitHub'>Design & Developed by Rakibul </Link> </p>
      </footer> */}

      
      <footer className='container-fluid'>
        <Footer/>
      </footer>




    </div>
  )
}

export async function getStaticProps(){
  const uri = `mongodb+srv://rakibul:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/nft-slot?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const db = client.db();

  const orderCollection = db.collection("orders");
  const allorder = await orderCollection.find().toArray();

  client.close();

  

    return {
      props: {
        orders: JSON.stringify(allorder)
      },
      revalidate:10
    }
    
  
  
}