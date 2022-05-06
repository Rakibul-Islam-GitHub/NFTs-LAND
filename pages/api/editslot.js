import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'POST') {

        const {title, url, img,  id} = req.body
        console.log(title, url, img,  id);
        
        if(title && url && img && id) {

  
            client.connect(async err => {
                const collection = client.db("nft-slot").collection("orders");
                
                const result= await collection.updateOne({"slotdetails.orderID": id}, {$set:{title: title, url: url, img: img}});
                
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