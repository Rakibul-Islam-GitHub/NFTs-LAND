import {client} from '../../database/dbConnect';

function handler(req, res) {
    
    if (req.method === 'GET') {
        
        const {id} = req.query;
        console.log(id);
        
        if(id) {

            console.log('from api', id);

            client.connect(async err => {
                const collection2 = client.db("nft-slot").collection("payments");
               
               const result= await collection2.find({ })

                    console.log(result);
                    if(result){
                        client.close();
                        
                        res.status(200).json({data:result, success: true, status:200});
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