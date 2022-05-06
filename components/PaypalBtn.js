import React, { useEffect } from 'react';
import  {PayPalButton}  from 'react-paypal-button-v2';

const PaypalBtn = () => {

    useEffect(()=>{
        // if (document.getElementsByClassName('paypal-buttons') !== undefined) {
        //     document.getElementsByClassName('paypal-buttons')[0].style.display = 'none';
        // }

        console.log(document.getElementsByClassName('paypal-buttons'));
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
            "AVkMvey7sHge6cgNc6XQBX94w6r9YijRegcRGGFYwdaA42wczk3Ip4ovSKojkYo5i4vzmDOv6l1mPlDt"
        }}
        onSuccess={(details, data) => {
          console.log("Details---------->", details);
          console.log("Data------------->", data);
        }}
      />
        </>
    );
};

export default PaypalBtn;