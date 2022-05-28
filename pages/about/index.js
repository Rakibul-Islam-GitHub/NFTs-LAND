import React from 'react';
import  Head  from "next/head";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const About = () => {
    return (
        <div>
             <Head>
        <title>About</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        
        <link rel="icon" href="/favicon.png" />
        <link href="http://fonts.cdnfonts.com/css/minecraft-3" rel="stylesheet"/>
                
      </Head>

      <div className='header-section'>
        
        <Header/>

        <section className='container about-body'>
            <div className='content'>
            <h3 className='text-center'>About</h3>
            <p className='font-arial'>What is TheNFTSlot.com?</p>
            <p className='mt-2 font-arial'>TheNFTSlots.com is just a huge grid of 6969 20x20 pixel slots, inspired by the love and creativity
in NFT community. Never stop vibing &#128526;</p>
            </div>
        </section>
        
        <footer className='container-fluid'>
        <Footer/>
      </footer>
      </div>
        </div>
    );
};

export default About;