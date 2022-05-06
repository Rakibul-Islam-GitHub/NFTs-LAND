import { PayPalButton } from "react-paypal-button-v2";
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Header from '../../components/header/Header';
import Router from 'next/router'
import { userContext } from '../_app';
import moment from 'moment';
import Loading from "../../components/loading/Loading";


const Checkout = () => {
  const router = useRouter();

const [selectedSlotinfo, setSelectedSlotinfo] = useContext(userContext);
const [isSlotSelected, setIsSlotSelected]= useState(false);
const [isScriptLoaded, setIsScriptLoaded] = useState(false);
const [loading, setLoading]= useState(true);

let unitPrice=10;

// const paypalScript = () => {
//   if (window.paypal) {
//     setIsScriptLoaded(true);
    
//     return;
//   }
//   const script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = `https://www.paypal.com/sdk/js?client-id=AZ7j3w64jr4pRYB6lhuAwBfgyoL8aJ2yZ6Z1Zsk1oNHvtGHDvlnaYF7b-YgjP7e-4FkvclLEj4CnF01s`;
//   script.async = true;

//   script.onload = () => setIsScriptLoaded(true);

//   document.body.appendChild(script);
//   // script.appendChild(pbtn);
// };
  useEffect(()=>{

  setSelectedSlotinfo(router.query);
    console.log('from checkout', selectedSlotinfo);
    if (router.query.top) {
      setIsSlotSelected(true);
      
    }
    // paypalScript();




    if (localStorage.getItem("email") === (null||'null')) {
        Router.push({
          pathname:'/login',
          query:  router.query || selectedSlotinfo
        })
        return;
    }

    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AZ7j3w64jr4pRYB6lhuAwBfgyoL8aJ2yZ6Z1Zsk1oNHvtGHDvlnaYF7b-YgjP7e-4FkvclLEj4CnF01s`;
      script.async = true;

      script.onload = () => setIsScriptLoaded(true);

      document.body.appendChild(script);
    };
    addPaypalScript();

    setLoading(false)

  
},[router])


    return (
        <>
         <Head>
        <title>Book Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* <Script src='/js/checkout.js'></Script> */}

{loading && <Loading/>}
      <div className='header-section'>
        
        <Header/>
  
    
      
      </div>

      {!isSlotSelected && 
      <div className="col-12 text-black p-5 container">
        
        <p>You did not select any slot! please select a single slot or multiple slots first...</p>
      </div>
      }








      {/* order summary section */}

      {isSlotSelected &&
      <section className="h-100 h-custom checkout-card" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-8 col-xl-6">
        <div className="card border-top border-bottom border-3">
          <div className="card-body p-5">

            <p className="lead fw-bold mb-4">Purchase Reciept</p>

            <div className="row">
              <div className="col mb-3">
                <p className="small text-muted mb-1">Date</p>
                <p>{ moment().format('MMM D, YYYY hh:mm A')}</p>
              </div>
              
            </div>

            <div className="mx-n5 px-5 py-4 checkout-item" >
            <div className="row">
                <div className="col-md-8 col-lg-9 mb-sm-0">
                  <p>No. of Slot Selected</p>
                </div>
                <div className="col-md-4 col-lg-3">
                  <p>{router.query.slot.length>2? router.query.slot.split(",").length : 1}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <p>Per Slot</p>
                </div>
                <div className="col-md-4 col-lg-3">
                  <p>${unitPrice}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <p>Subtotal</p>
                </div>
                <div className="col-md-4 col-lg-3">
                  <p>${router.query.slot.split(",").length*unitPrice}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <p className="mb-0">Shipping</p>
                </div>
                <div className="col-md-4 col-lg-3">
                  <p className="mb-0">$0</p>
                </div>
              </div>
            </div>

            <div className="row my-2 me-4">
              <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                
                <p className="lead col-md-4 col-lg-3 fw-bold mb-0 total-price">${router.query.slot.split(",").length*unitPrice}</p>
              </div>
            </div>

            

            <div className="row">
              <div className="col-lg-12 paypal-btn mt-3">

                {/* todo payment btn */}
                {isScriptLoaded? 
                <PayPalButton
                amount={router.query.slot.split(",").length*unitPrice}
                shippingPreference="NO_SHIPPING"
                onSuccess={async (details, data) => {
                  
                  setLoading(true);
                  const res= await fetch("/api/payment", {
                    method: "post",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      orderID: data.orderID,
                      payerAddress: details.payer.address,
                      payerEmail: details.payer.email_address,
                      user: localStorage.getItem("email") || loggedInUser.email,
                      amount: details.purchase_units[0].amount.value,
                      paymentAt: details.update_time,

                    })
                    
                  });
                  const getData= await res.json();
                  
                  if (getData.success) {
                    router.push({
                      pathname:'/addslot',
                      query: {...router.query, orderID: data.orderID}
                    })
                  }



                }}
              />
                : 
                <span>Loading...</span>  

                
              }

              </div>
            </div>

           

            {/* <p className="mt-4 pt-2 mb-0">Want any help? <a className="contact-checkout"href="#!">Please contact
                us</a></p> */}

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      }
      
            
        </>
    );
};

export default Checkout;