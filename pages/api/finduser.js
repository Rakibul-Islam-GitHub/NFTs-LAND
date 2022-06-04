import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'POST') {
        
        
        const data = req.body
     const email= data.email;
        if(data.email ){

            client.connect(async err => {
                const collection = client.db("nft-slot").collection("users");
                
                const result= await collection.findOne({ email})
               
                if(result){
                    client.close();
                    res.status(200).send(result);
                }else{
                    console.log(err);
                    res.status(403).json({msg:'Invalid Username or Password'});
                }
                
              });


            
            

        }
        else{
            res.status(403).json({msg:'Email not found'});
            return;
        }
       
    }else{
        res.status(403).json({msg:'Email not found'});
    }
    
}


export default handler;