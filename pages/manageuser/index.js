import React, { useEffect, useState } from 'react';
const { MongoClient, ServerApiVersion } = require('mongodb');
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import moment from 'moment';


const ManageUser = (props) => {
    const users= JSON.parse(props.users);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const deleteUser=async (e,userid)=>{
        console.log(userid);
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
                        window.location.href =`/manageuser`
                    //    setLoading(false)

                       
                    }else{alert('Error occured')}
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
        
        if (localStorage.getItem("email") !== 'thenftslandofficial@gmail.com') {
            router.push('/logout')
            return;
        }
        
    setLoading(false)
       },[setLoading, router])


    return (
        <>
        <div className='header-section'>
        
        <Header/>
  
      </div>
      {loading&& <Loading/>}

      <div className=" manage-slot">

          <div className="p-2 col-sm-12 col-md-10 col-lg-8">
              <h5 className='mb-2'>Manage Users</h5>


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
                      
                      {user.email!=='thenftslandofficial@gmail.com' && <td> 
                          {/* <Link onClick={()=> setLoading(true)} href={'/manageslot/edit/'+order._id}>Edit</Link>  */}

                       <p className="deleteuser" style={{color:'red', cursor: 'pointer'}}  onClick={(e)=> deleteUser(e,user._id)}  href='#'>Delete</p> 
                      </td>}
                      
                      
                    </tr>
                        )
                    })}
                   
                  </tbody>
                </table>



          </div>

      </div>
        </>
    );
};



export async function getStaticProps(){
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
        revalidate:10
      }
      
    
    
  }
export default ManageUser;