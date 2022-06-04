import React, { useEffect } from 'react';
import  {PayPalButton}  from 'react-paypal-button-v2';

const PaypalBtn = () => {

    useEffect(()=>{
       
    })
    return (
        <>
            <PayPalButton
            // onButtonReady={()=>{
            //     document.getElementsByClassName('paypal-buttons')[0].style.display = 'none'
            // }}
        shippingPreference="NO_SHIPPING"
        amount="0.01"
        options={{
          clientId:
            "AUemDNueGuWwFHFfkZWtRHd27dzm5pO6XzFzoxozPnwL5-dkBI2sibnXIXLae7JNDMCS3xstTtr2_Agc"
        }}
        onSuccess={(details, data) => {
          
        }}
      />
        </>
    );
};

export default PaypalBtn;