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
       
        let data = req.body
        data.resetcode= makeid(18);
        if(data.email && data.password && data.displayName){
            
            client.connect(async err => {
                const collection = client.db("nft-slot").collection("users");
                
                const result= await collection.insertOne(data);
                // console.log(result)
                if(result){
                    client.close();
                    res.status(200).send('Registration done successfully');
                }else{
                    console.log(err);
                    res.status(500).send('server error')
                }
                
              });


            
            

        }
        else{
            res.status(403).send('invalid data')
        }
       
    }
    
}


export default handler;