import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'POST') {
        
        const email = req.body.email;
        
        if(email){

            client.connect(async err => {
                const collection = client.db("nft-slot").collection("users");
                
                const result= await collection.findOne({ email})
                // console.log(result)
                if(result){
                    client.close();
                    res.status(200).send(result);
                }else{
                    console.log(err);
                    res.status(403).send('Invalid Username or Password');
                }
                
              });


            
            

        }
        else{
            res.status(403).send('invalid data')
        }
       
    }
    
}


export default handler;