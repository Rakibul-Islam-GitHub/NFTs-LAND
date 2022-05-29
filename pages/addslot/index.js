
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
    if (localStorage.getItem("email") == (null||'null')) {
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
        let url= e.target.url.value;
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
        //adding http to url
        
if (url.substr(0, 'http://'.length) !== 'http://')
{
    url = 'http://' + url;
}
       await fetch('/api/editslot', {
        method:"post",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({title,  img,url,  id:router.query.id})}).then(res => res.json()).then(data => {
            if (data.success) {
                alert('Your slot has been allocated! You will be redirected to homepage now!')
                e.target.image.value='';
                e.target.url.value= '';
                e.target.title.value= '';
                window.location='/';
            }else{
                alert('Something went wrong! please contact us for further assistance')
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
        <title >Add Your Slot!</title>
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
  Something went wrong, Please try again...
</div>
:

<div className="addreview col-md-12 ">

<div className=" mt-2 form-center">

<h4 className="text-center mt-1 mt-lg-4 mb-3">Add new slot</h4>
            <Form onSubmit={addSlotHandler} className="review-form ">

               
                <Form.Group className='mb-2' controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required name="title" />
                </Form.Group>

                <Form.Group className='mb-2' controlId="exampleForm.ControlInput1">
                    <Form.Label>Url/Link</Form.Label>
                    <Form.Control required type="text" name="url" />
                </Form.Group>

                <Form.Group className='mb-2' controlId="exampleForm.ControlInput1">
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