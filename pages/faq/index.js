import React from 'react';
import  Head  from "next/head";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Script from 'next/script'

const Faq = () => {
    return (
        <div>
             <Head>
        <title>FAQ</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        
        <link rel="icon" href="/favicon.png" />
        <link href="http://fonts.cdnfonts.com/css/minecraft-3" rel="stylesheet"/>
        
      </Head>
      <Script
        id="bootstrap.bundle"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        
      />
      
     

      <div className='header-section'>
        
        <Header/>

        <section className='container about-body'>
            <div className='content content-faq'>
            <h3 className='text-center'>FAQ</h3>
           <div className="accordion col-12 col-md-10 col-lg-8">
       <div className="m-4">
  <div className="accordion" id="myAccordion">
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button type="button" className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne"><h5>1. How much is it per slot?</h5></button>									
      </h2>
      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#myAccordion">
        <div className="card-body">
          <p>It is $10 per slot.</p>
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo"><h5>2. Is it on blockchain?</h5></button>
      </h2>
      <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
        <div className="card-body">
          <p>No. It is not. But you will own the slot to display any nft-related image(s). Be part of the nft history :)</p>
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree"><h5>3. What can be displayed in an NFT Slot?</h5></button>                     
      </h2>
      <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
        <div className="card-body">
          <p>Each slot is one base unit which is a 20x20 set of pixels. You can display any nft or
blockchain related image(s). No pornography allowed ;)
</p>
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="headingFour">
        <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour"><h5>4. Once a slot is filled with an image and URL, can it be changed?</h5></button>									
      </h2>
      <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#myAccordion">
        <div className="card-body">
          <p>Yes :) You can change it anytime on Manage Slots Page. </p>
        </div>
      </div>
    </div>

    
  </div>
</div>

           </div>
            </div>
        </section>
        
        <footer className='container-fluid'>
        <Footer/>
      </footer>
      </div>
        </div>
    );
};

export default Faq;