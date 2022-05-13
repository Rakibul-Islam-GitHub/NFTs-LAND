import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script'
import Header from '../components/header/Header'

import { Router, useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { userContext } from './_app'
import Footer from '../components/footer/Footer';
const { MongoClient, ServerApiVersion } = require('mongodb');


export default function Home(props) {
  const slots= JSON.parse(props.orders);
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  const [selectedSlotinfo, setSelectedSlotinfo] = useContext(userContext);
  const [loading, setLoading]= useState(true);
  const router = useRouter()

  
  const handleProceed= (e) => {
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

    if (localStorage.getItem('email')==='thenftslandofficial@gmail.com') {
      router.push({
        pathname:'/addslot',
        query: {...selectedSlotDetails, orderID:'admin'}
    }) 
    return;
    }
    router.push({
      pathname: '/checkout',
      query: selectedSlotDetails
  })
  }
  
  
  return (
    <div className=''>
      <Head>
        <title>Book Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        <meta name="viewport" content="width=104"/>
        <link rel="icon" href="/favicon.png" />
        <link href="http://fonts.cdnfonts.com/css/minecraft-3" rel="stylesheet"/>
                
      </Head>
      <Script src="/js/script.js" ></Script>
      
      
      <div className="preloader"></div>
      <div className='header-section'>
        
        <Header/>
  
        
     
      
      </div>

      
  
      <div className="pt-5 home-main-body">
      {/* <p className="notice"></p> */}

        
          <div id='slot-wrapper' className="slot-wrapper mb-5">

          <p className="notice">Double click on any blank space after selecting your desire slot(s)</p>

          
       {slots.map( (slot)=> {
         return(
           <>
           <div key={slot._id.toString()} className="slot-img">
           <div className="hover-div" style={{top:slot.slotdetails.top-100+'px', left:(slot.slotdetails.left-80)+'px'}}>
             <p className="slot-num">Slot No. {slot.slotdetails.slot}</p>
             <img src={slot.img} alt={slot.title} style={{maxHeight:'110px', width:'210px' }} />
         <h5 className="slot-title">{slot.title}</h5>
         <p className="slot-url">Link: <a href={slot.url}>Click Here</a> </p>
       </div>

       <img key={slot._id.toString()} className='slotimg' src={slot.img} height={slot.slotdetails.hight} width={slot.slotdetails.width} alt="slot-image" 
           style={{position: 'absolute', top: slot.slotdetails.top+'px', left: slot.slotdetails.left+'px', objectFit:'fill', height:slot.slotdetails.hight+'px', width:slot.slotdetails.width+'px'}}
           />
           </div>
           </>
          

         )
      })}

     
        
        
          </div>


      </div>
      
     
      
      {/* invalid slot selection modal */}
   <div id="myModal" className="modal">
   <div className="modal-content">
    <div className="modal-header">
      
      <h4 className="modal-header-text">Invalid slot selecion</h4>
      <span className="close">&times;</span>
    </div>
    <div className="modal-body">
      <p id='modal-msg'>Your selected row(s) is invalid. Please select adjucent row/column.</p>
      
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
    <div className="proceed-modal-footer">
    
     
      <button onClick={handleProceed} id='proceedbtn' className="btn proceedbtn">Proceed</button>
    
    </div>
  </div>
   </div>
   {/* modal end */}

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
      revalidate:100
    }
    
  
  
}