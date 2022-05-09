
import {  Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from '../../../components/loading/Loading'
import { useContext, useEffect, useState } from "react";
import  Head  from "next/head";
import Header from "../../../components/header/Header";
import { userContext } from "../../_app";
const { MongoClient, ServerApiVersion } = require('mongodb');
import { ObjectId } from "mongodb";


const Edit = (props) => {
    const router = useRouter();
    const [loggedInUser] = useContext(userContext);
    const [selectedSlotinfo] = useContext(userContext);
    const [image, setImage]= useState()
    const [loading, setLoading] = useState(false)
    const order= JSON.parse(props.singleorder);

   useEffect(() =>{
   

   },[])
    const changeHandler = (event) => {
		setImage(event.target.files[0]);
		
	};
    
    const addReviewHandler= async (e)=> {
        setLoading(true)
        e.preventDefault();
        const title = e.target.title.value;
        const url= e.target.url.value;
        let img = order.img
        console.log(title, url);
        const owner= await localStorage.getItem("email");

       
      if (image !== undefined) {
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
       await fetch('/api/editslot', {
        method:"post",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({title, url, img, id:order._id})}).then(res => res.json()).then(data => {
            if (data.success) {
                e.target.image.value='';
                e.target.url.value= '';
                e.target.title.value= '';
               router.back();
               
            }


            
        })
        
        
    }else{
        alert('Problem with image upload');
    }
    })
    .catch(err => console.log(err))
      } else {
       
        await fetch('/api/editslot', {
            method:"post",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({title, img:order.img, url, id:order._id})}).then(res => res.json()).then(data => {
                if (data.success) {
                    
                    e.target.url.value= '';
                    e.target.title.value= '';
                   router.back();
                   
                }else{alert('Error occured')}
            })
      }

      
        

    }
    return (
        <>
        <Head>
        <title>Edit Your Slot!</title>
        <meta name="description" content="Get a NFT slot on the internet, make your presence more wider, grow your business" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='header-section'>
        
        <Header/>
  
    
      
      </div>
        
      {/* <div className="">
      <PaypalBtn></PaypalBtn>
      </div> */}


<div className="addreview col-md-12 ">
{loading&& <Loading/>}
<div className=" mt-2 form-center">
<h4 className="text-center mb-3">Update The slot</h4>
            <Form onSubmit={addReviewHandler} className="review-form ">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" defaultValue={order.title} required name="title" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Url/Link</Form.Label>
                    <Form.Control required type="text" defaultValue={order.url} name="url" />
                </Form.Group>

                <Form.Group className='mt-4' controlId="exampleForm.ControlInput1">
                    <Form.Label>Image</Form.Label>
                    <img className="mb-3 ms-2" src={order.img} height="50" width="50" alt="" />
                    <Form.Control  type="file" onChange={changeHandler} name="image" />
                </Form.Group>
                
                
            <Button className="mt-4" type="submit">Submit</Button>
            </Form>
</div>

</div>  




        </>
    );
};


export async function getServerSideProps(context){
    const id = context.params.orderid;
    const uri = `mongodb+srv://rakibul:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/nft-slot?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const db = client.db();
    const orderCollection = db.collection("orders");

   
        const orderbyid = await orderCollection.findOne({"_id": ObjectId(id)});
  
    client.close();

    return {
        props: {
            singleorder: JSON.stringify(orderbyid)
        },
        
      }
   
  }

export default Edit;