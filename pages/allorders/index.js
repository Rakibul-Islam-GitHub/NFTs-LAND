import React, { useEffect, useState } from 'react';
const { MongoClient, ServerApiVersion } = require('mongodb');
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import moment from 'moment';


const Allorders = (props) => {
    const orders= JSON.parse(props.orders);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect( () =>{
        
        if (localStorage.getItem("email") !== process.env.NEXT_PUBLIC_ADMIN) {
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

          <div className="p-2 col-12 col-md-10 col-lg-8">
              <h5 className='mb-2'>View All Orders & Payments</h5>


              <table className="table table-striped">
                  <thead >
                      <tr>
                      <th>Order ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Email</th>
                      <th scope="col">Amount</th>
                      </tr>
                    
                  </thead>
                  <tbody>
                    {/* {orders.length===0 && <p>Not found</p> } */}
                    {orders.map(order =>{
                        return(
                            <tr key={order._id}>
                      
                      <td> {order.orderID} </td>
                      <td>{moment().format(order.paymentAt)}</td>
                      <td>{order.payerEmail}</td>
                      <td>{order.amount+ ' USD'}</td>
                      
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
  
    const orderCollection = db.collection("payments");
    const allorder = await orderCollection.find().toArray();
  
    client.close();
  
    
  
      return {
        props: {
          orders: JSON.stringify(allorder)
        },
        revalidate:10
      }
      
    
    
  }
export default Allorders;