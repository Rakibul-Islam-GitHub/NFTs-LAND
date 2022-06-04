import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import {Modal,Form, Button} from 'react-bootstrap';
const { MongoClient, ServerApiVersion } = require('mongodb');

const AdminPanel = (props) => {
    const allorders= JSON.parse(props.ordersbyid);
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(allorders)
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [addmodalshow, setAddmodalshow] = useState(false);
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [userid, setUserid] = useState('')

    const handleClose = () => {setShow(false);
        setAddmodalshow(false);
      }
      const handleShow = ( id) => {
          
          setUserid(id)
          setShow(true);
    }
    const handleaddmodalshow = () => {
      
      
      setAddmodalshow(true);
    }
    // add new user
    const handleadduser=async (e) => {
        
        e.preventDefault()
        if (name ==='') {
            alert('Please fill all the fields',name,email,password)
            return;
        }else if (email==='') {
            alert('Please fill all the fields',name,email,password)
            return;
            }else if (password==='') {
                alert('Please fill all the fields',name,email,password)
                return;
                }

        try {
          
          setLoading(true);
          setAddmodalshow(false);
          const resemail = await axios.post('/api/emailcheck', {email});
                if(resemail.status===200){
      alert('Email already exists');
      setEmail('')
      setLoading(false)
      return;
                }
                
                
                 
               
          
          
      } catch (error) {
        const res = await axios.post('/api/userRegistration', {email, password, displayName:name});
          
        if(res.status===200){
          setAddmodalshow(false)
        
         setAddmodalshow(false);
        
        router.push('/manageuser')
          return;
          
        }
          console.log(error);
          setLoading(false)
          
      
          
      }
      }
// add new user end

// delete user start
const deleteUser=async (e)=>{
    setLoading(true);
setShow(false);
   
    e.preventDefault();
    setLoading(true)

    try {
        await fetch('/api/deleteuser', {
            method:"post",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({id:userid})}).then(res => res.json()).then(data => {
                if (data.success) {
                  // window.location.href='/manageuser';
                  

router.reload(window.location.pathname)
                //    setLoading(false)

                   
                }else{router.reload(window.location.pathname); alert('Error occured')}
            })
    } catch (error) {
        console.log(error);
    }
}
// delete user end

    const deleteSlot=async (e,slotid)=>{
        
        e.preventDefault();
        setLoading(true)
        try {
            await fetch('/api/deleteslot', {
                method:"post",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({id:slotid})}).then(res => res.json()).then(data => {
                    if (data.success) {
                        router.reload(window.location.pathname)
                    //    setLoading(false)

                       
                    }else{alert('Error occured')}
                })
        } catch (error) {
            alert('Unauthorized access denied')
        }
    }

    useEffect( () =>{
        
        if (localStorage.getItem("email") !== process.env.NEXT_PUBLIC_ADMIN) {
            router.push('/login')
            return;
        }
        
    setLoading(false)
       },[])


    return (
        <>
        <div className='header-section'>
        
        <Header/>
  
      </div>
      {loading&& <Loading/>}

      <div className=" manage-slot">

          <div className="p-2 col-12 col-md-10 col-lg-8">
          <div className="user-table-header d-flex justify-content-between mb-4">
             <h5 className='mb-2'>Manage slots & Users</h5>
              <button onClick={handleaddmodalshow} className='float-right me-2'>Add new user</button>

             </div>

              <table className="table table-striped">
                  <thead >
                      <tr>
                      <th>Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">URL</th>
                      <th scope="col">User</th>
                      <th scope="col">Action</th>
                      </tr>
                    
                  </thead>
                  <tbody>
                    
                    {orders.map(order =>{
                        return(
                            <tr key={order._id}>
                      
                      <td> <img className="coinicon-lq" src={order.img} width="50px" height="50px" alt="slot-img" />  </td>
                      <td>{order.title}</td>
                      <td>{order.url}</td>
                      <td className='delete-user'>{order.owner}
                      <br /> {order.owner!==process.env.NEXT_PUBLIC_ADMIN && <button onClick={()=>handleShow(order.owner)} className='delete-user-btn'>Delete the user</button>}
                      </td>
                      <td> <Link onClick={()=> setLoading(true)} href={'/manageslot/edit/'+order._id}>Edit</Link> 
                       <span className="ms-2 " onClick={(e)=> deleteSlot(e,order._id)}><Link href='#'>Delete</Link> </span>
                      </td>

                      
                      
                    </tr>
                        )
                    })}


                   
                  </tbody>
                </table>

{/* modal for delete user prompt */}
<Modal className='user-modal' show={show} onHide={handleClose} size="md"
      aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <p>You are going to delete the user.All the slots, user data will be removed.</p>
        </div>
            
            </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={(e)=> deleteUser(e,orders.owner)}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for adding new user */}
      <Modal className='adduser-modal' show={addmodalshow} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className='d-flex justify-content-start mb-3'>
       {/* <label htmlFor="uname"><b className='text-black col-6'>Name</b></label> */}
    <input type="text" value={name} placeholder="enter name" onChange={(e) => setName(e.target.value)} name="uname" required/>
           
         </div> 
    <div className='d-flex justify-content-start mb-3'>
    {/* <label htmlFor="uemail"><b className='text-black'>Email</b></label> */}
    <input type="text" value={email} placeholder="enter email" onChange={(e) => setEmail(e.target.value)} name="email" required/>
            
    </div>
    <div className='d-flex justify-content-start mb-2'>
    {/* <label htmlFor="upass"><b className='text-black'>Password</b></label> */}
    <input type="text" value={password} placeholder="enter password" onChange={(e) => setPassword(e.target.value)} name="password" required/>
            
    </div>
            </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={(e)=>handleadduser(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
                {orders.length===0 && <span className="ms-2">You do not have any slot!</span> }



          </div>

      </div>
        </>
    );
};


export async function getServerSideProps(){
   
    const uri = `mongodb+srv://rakibul:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/nft-slot?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const db = client.db();
    const orderCollection = db.collection("orders");

   let orderbyid;
        
       
             orderbyid = await orderCollection.find().toArray();
        
        
  
        client.close();

        return {
            props: {
              ordersbyid: JSON.stringify(orderbyid)
            },
            
          }
   
  }

export default AdminPanel;