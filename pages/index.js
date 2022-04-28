import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Header from '../components/header/Header'
import HomeHero from '../components/HomeHero'


export default function Home() {

  const getSlotInfo=(data) => {
    console.log(dada);
  }
  return (
    <div className=''>
      <Head>
        <title>Book Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/js/script.js"></Script>
      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></Script> */}
      

      <div className='header-section'>
        
        <Header/>
  
        
      {/* <div className="hero">
        
      <img className="hero-img" height="100%" width="100%" src="/images/hero-img.png" alt="" />

      

      </div>

      <div className="hero-section-text d-flex justify-content-center align-items-center pt-5">
      <HomeHero/>
      </div> */}
      
      </div>

       

      <div className=" home-main-body">

      {/* modal */}
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
        
          <div id='slot-wrapper' className="slot-wrapper">
        
        
          </div>


      </div>
      
     
      

      <footer className='footer d-flex align-items-center justify-content-center'>
       <p className='m-0 d-flex align-items-center'>&copy;All right reserved 2022</p>
      </footer>

      




    </div>
  )
}
