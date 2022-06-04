import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'POST') {
        
        const {orderID, payerAddress, payerEmail, user, amount, paymentAt} = req.body
        
        if(orderID && payerAddress && payerEmail && user && amount && paymentAt) {

           

            client.connect(async err => {
                const collection = client.db("nft-slot").collection("payments");
               
                const result= await collection.insertOne(
                    {
                        orderID: orderID,
                        payerAddress: payerAddress,
                        payerEmail: payerEmail,
                        user: user,
                        amount: amount,
                        paymentAt: paymentAt

                    });
                
                if(result){
                    client.close();
                    
                    res.status(200).json({success: true, status:200});
                }else{
                    console.log(err);
                    res.status(500).json({success: false});
                }
                
              });


            
            

        }
        else{
            res.status(403).json({message:'Invalid data'})
        }
       
    }else{
        res.status(404).json({message:'Request not found'})
    }
}


export default handler;