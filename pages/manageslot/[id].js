import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
const { MongoClient, ServerApiVersion } = require('mongodb');

const Manageslot = (props) => {
    const allorders= JSON.parse(props.ordersbyid);
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(allorders)
    const router = useRouter();

    const deleteSlot=async (e,slotid)=>{
        setLoading(true)
        e.preventDefault();

        try {
            await fetch('/api/deleteslot', {
                method:"post",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({id:slotid})}).then(res => res.json()).then(data => {
                    if (data.success) {
                        window.location.href =`/manageslot/${localStorage.getItem("email")}`
                    //    setLoading(false)

                       
                    }else{alert('Error occured')}
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
        // console.log(orders);
        if (localStorage.getItem("email") === ( undefined || null)) {
            router.push('/login')
            return;
        }
        const getOdersbyid= async (id) => {
            const res= await axios.get('/api/orderbyid/', { params: { id: id } })
            // console.log(res.data);
        }
        // getOdersbyid('admin');
    setLoading(false)
       },[setLoading])


    return (
        <>
        <div className='header-section'>
        
        <Header/>
  
      </div>
      {loading&& <Loading/>}

      <div className=" manage-slot">

          <div className="p-2 col-12 col-md-10 col-lg-8">
              <h5 className='mb-2'>Manage slot</h5>


              <table className="table table-striped">
                  <thead >
                      <tr>
                      <th>Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">URL</th>
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
                      <td> <Link onClick={()=> setLoading(true)} href={'/manageslot/edit/'+order._id}>Edit</Link> 
                       <span className="ms-2 " onClick={(e)=> deleteSlot(e,order._id)}><Link   href='#'>Delete</Link> </span>
                      </td>

                      
                      
                    </tr>
                        )
                    })}


                   
                  </tbody>
                </table>
                {orders.length===0 && <span className="ms-2">You do not have any slot!</span> }



          </div>

      </div>
        </>
    );
};


export async function getServerSideProps(context){
    const id = context.params.id;
    const uri = `mongodb+srv://rakibul:${process.env.DB_PASS}@cluster0.gpypc.mongodb.net/nft-slot?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const db = client.db();
    const orderCollection = db.collection("orders");

   let orderbyid;
        
        if (id===process.env.NEXT_PUBLIC_ADMIN) {
             orderbyid = await orderCollection.find().toArray();
        } else {
             orderbyid = await orderCollection.find({owner:id}).toArray();
        }
        
  
        client.close();

        return {
            props: {
              ordersbyid: JSON.stringify(orderbyid)
            },
            
          }
   
  }

export default Manageslot;