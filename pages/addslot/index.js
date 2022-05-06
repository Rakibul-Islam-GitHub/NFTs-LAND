
import Header from '../../components/header/Header';
import {  Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { userContext } from "../_app";
import { useContext, useEffect, useState } from "react";
import  Head  from "next/head";
import Loading from '../../components/loading/Loading';


const AddSlot = () => {
    const router = useRouter();
    const [loggedInUser] = useContext(userContext);
    const [selectedSlotinfo] = useContext(userContext);
    const [image, setImage]= useState()
    const [loading, setLoading] = useState(false);
    const slotDetails= router.query || selectedSlotinfo;
    console.log(slotDetails);
   useEffect(() =>{
    if (localStorage.getItem("email") == null) {
        router.push({
          pathname:'/login',
          query: router.query
        })
    }

   },[router])
    const changeHandler = (event) => {
		setImage(event.target.files[0]);
		
	};
    
    const addSlotHandler= async (e)=> {
        setLoading(true)
        e.preventDefault();
        const title = e.target.title.value;
        const url= e.target.url.value;
        let img = '';
        
        const owner= await localStorage.getItem("email");

       
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='header-section'>
        
        <Header/>
  
      </div>
      {loading && <Loading/>}
        
      {/* <div className="">
      <PaypalBtn></PaypalBtn>
      </div> */}

{!(router.query.top && router.query.orderID) ? 
 <div className="alert alert-danger container d-flex justify-content-center m-5" role="alert">
  Something went wrong...
</div>
:
<div className="addreview col-md-12 ">

<div className=" mt-2 form-center">
<h4 className="text-center mb-3">Add new slot</h4>
            <Form onSubmit={addSlotHandler} className="review-form ">
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


}


      
               
        
            
        </>
    );
};

export default AddSlot;