
import Header from '../../components/header/Header';
import {  Form, Button } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { userContext } from "../_app";
import { useContext, useEffect, useState } from "react";
import  Head  from "next/head";

const AddSlot = () => {
    const router = useRouter();
    const [loggedInUser] = useContext(userContext);
    const [image, setImage]= useState()
    const slotDetails= router.query;
    console.log(slotDetails);
   useEffect(() =>{
       

   },[])
    const changeHandler = (event) => {
		setImage(event.target.files[0]);
		
	};
    
    const addReviewHandler= async (e)=> {
        e.preventDefault();
        const title = e.target.title.value;
        const url= e.target.url.value;
        let img = '';
        
        const owner= loggedInUser.displayName || 'admin';

       
        const formData = new FormData();

		formData.append('file', image);
        formData.append("upload_preset", "nft-slot");
        formData.append("cloud_name","rakibul21");
    




      await fetch("https://api.cloudinary.com/v1_1/rakibul21/image/upload",{
    method:"post",
    body: formData
    })
    .then(resp => resp.json())
    .then( async data => {
    if (data.url) {
        img= data.url;
        console.log(img);
       await fetch('/api/addslot', {
        method:"post",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({title, url, img,  owner, slotdetails:slotDetails})}).then(res => res.json()).then(data => {
            if (data.success) {
                e.target.image.value='';
                e.target.url.value= '';
                e.target.title.value= '';
                window.location='/';
            }


            
        })
        
        
    }else{
        alert('Problem with image upload');
    }
    })
    .catch(err => console.log(err))

      
        

    }
    return (
        <>
        <Head>
        <title>Add Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='header-section'>
        
        <Header/>
  
    
      
      </div>
        
               
      <div className="addreview col-md-12 ">

<div className=" mt-2 form-center">
<h4 className="text-center mb-3">Add new slot</h4>
            <Form onSubmit={addReviewHandler} className="review-form ">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required name="title" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Url/Link</Form.Label>
                    <Form.Control required type="text" name="url" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control required type="file" onChange={changeHandler} name="image" />
                </Form.Group>
                
                
            <Button className="mt-4" type="submit">Submit</Button>
            </Form>
</div>

</div>    
               
        
            
        </>
    );
};

export default AddSlot;