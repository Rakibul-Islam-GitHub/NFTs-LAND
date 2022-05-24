import {client} from '../../database/dbConnect';
import { ObjectId } from "mongodb";
function handler(req, res) {
    
    if (req.method === 'POST') {

        const {id} = req.body
        console.log(id);
        
        if(id) {

  
            client.connect(async err => {
                const collection = client.db("nft-slot").collection("users");
                
                const result= await collection.deleteOne({"_id": ObjectId(id)});
                
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