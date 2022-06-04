import {client} from '../../database/dbConnect';

function handler(req, res) {
     // generate unique id 
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
    
    if (req.method === 'POST') {

        const {password, code} = req.body
        
        
        if(password && code) {

            const resetcode= makeid(18)
           
            client.connect(async err => {
                const collection = client.db("nft-slot").collection("users");
                
                const result= await collection.updateOne({"resetcode": code}, {$set:{password: password,resetcode: resetcode}});
                
                if(result.modifiedCount){
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