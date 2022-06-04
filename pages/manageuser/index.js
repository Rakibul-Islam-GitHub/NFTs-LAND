import React, { useEffect, useState } from 'react';
const { MongoClient, ServerApiVersion } = require('mongodb');

import { useRouter } from "next/router";
import axios from "axios";
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';

import {Modal,Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from "@fortawesome/free-solid-svg-icons"


const ManageUser = (props) => {
    const users= JSON.parse(props.users);
    const [loading, setLoading] = useState(false)
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
  const handleShow = (name, id) => {
      setName(name)
      setUserid(id)
      setShow(true);
}
const handleaddmodalshow = () => {
  
  
  setAddmodalshow(true);
}

const  handleEditName= async (id)=>{
setLoading(true);
setShow(false);
await fetch('/api/edituser', {
    method:"post",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({name, id:userid})}).then(res => res.json()).then(data => {
        if (data.success) {
            
            // setLoading(false);
            alert('Name Updated Successfully!')
            // window.location='/manageuser'
            router.reload(window.location.pathname)
            
           
        }else{alert('Error occured')}
    })

}


const handleadduser=async () => {
  try {
    
    setLoading(true);
    setAddmodalshow(false);
    const resemail = await axios.post('/api/emailcheck', {email});
          if(resemail.status===200){
alert('Email already exists');
setLoading(false)
return;
          }
          
          
           
         
    
    
} catch (error) {
  const res = await axios.post('/api/userRegistration', {email, password, displayName:name});
    
  if(res.status===200){
    setAddmodalshow(false)
  //  alert('New user added successfully')
   setAddmodalshow(false);
  //  setLoading(false)
  //  window.location=`/manageuser`
  router.reload(window.location.pathname)
    return;
    
  }
    console.log(error);
    setLoading(false)
    

    
}
}


    const deleteUser=async (e,userid)=>{
        
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

                       
                    }else{window.location='/manageuser'; alert('Error occured')}
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
        
        if (localStorage.getItem("email") !== process.env.NEXT_PUBLIC_ADMIN) {
            router.push('/login')
            return;
        }
        
    setLoading(false)
       },[ router])


    return (
        <>
        <div className='header-section'>
        
        <Header/>
  
      </div>
      {loading&& <Loading/>}

      <div className=" manage-slot">

          <div className="p-2 col-12 col-md-10 col-lg-8">
             <div className="user-table-header d-flex justify-content-between mb-4">
             <h5 className='mb-2'>Manage Users</h5>
              {/* <button onClick={handleaddmodalshow} className='float-right me-2'>Add new user</button> */}

             </div>

              <table className="table table-striped">
                  <thead >
                      <tr>
                      <th>User Id</th>
                      <th>Name</th>
                      
                      <th scope="col">Email</th>
                      <th scope="col">Action</th>
                      
                      </tr>
                    
                  </thead>
                  <tbody>
                    {/* {orders.length===0 && <p>Not found</p> } */}
                    {users.map(user =>{
                        return(
                            <tr key={user._id}>
                      
                      <td> {user._id} </td>
                      <td> {user.displayName} </td>
                      
                      <td>{user.email}</td>
                      
                      <td> 
                          <span className="nextButton text-center cursor-pointer" onClick={()=>handleShow(user.displayName, user._id)} href="#" ><FontAwesomeIcon icon={faUserPen} /></span> 
                          </td>
                      {/* {user.email!==process.env.NEXT_PUBLIC_ADMIN && 
                      <td> 
                          <span className="nextButton cursor-pointer" onClick={()=>handleShow(user.displayName, user._id)} href="#" >Edit</span> 

                       <span className="deleteuser ms-2" style={{color:'red', cursor: 'pointer'}}  onClick={(e)=> deleteUser(e,user._id)}  href='#'>Delete</span> 
                      
                      </td>} */}
                      
                      
                    </tr>
                        )
                    })}
                   
                  </tbody>
                </table>

{/* modal for edit name */}

<Modal className='user-modal' show={show} onHide={handleClose} size="md"
      aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="uname"><b className='text-black'>Name</b></label>
    <input type="text" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} name="uname" required/>
            
            </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={()=>handleEditName()}>
            Save Changes
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
          <Button variant="primary" onClick={()=>handleadduser()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

          </div>

      </div>
        </>
    );
};



export async function getServerSideProps(){
    const uri = `mongodb+srv://rakibul:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/nft-slot?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const db = client.db();
  
    const userCollection = db.collection("users");
    const alluser = await userCollection.find().toArray();
  
    client.close();
  
    
  
      return {
        props: {
          users: JSON.stringify(alluser)
        },
        // revalidate:10
      }
      
    
    
  }
export default ManageUser;