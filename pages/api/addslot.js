import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'POST') {
        // const reviewCollection= dbobj.collection('reviews');
        
        const {title, url, img,  owner, slotdetails} = req.body
        
        if(title && url && img && owner) {

            

            client.connect(async err => {
                const collection = client.db("nft-slot").collection("orders");
                // perform actions on the collection object
                const result= await collection.insertOne({title: title, url: url, owner: owner, img: img, slotdetails:slotdetails});
                
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
       
    }
}


export default handler;