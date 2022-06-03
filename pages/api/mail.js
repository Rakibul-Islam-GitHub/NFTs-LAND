
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
import {client} from '../../database/dbConnect';
let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: 'thenftslot@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
})


export default function handler(req, res) {
  

  if (req.method === 'POST') {
    const {email} = req.body;
    

    client.connect(async err => {
      const collection = client.db("nft-slot").collection("users");
      
      const result= await collection.findOne({ email})
      // console.log(result)
      if(result){
          client.close();
          const mailData = {
            from: 'thenftslot@gmail.com',
            to: email,
            subject: `Password reset for NFT SLOT`,
            text: 'Password Reset link',
            html: `<div>Here is your password reset link. Please click on the link and provide your new password.</div>
            <p><a href='https://nft-s-land.vercel.app/resetpass/?code=${result.resetcode}'>Click Here</a></p>`
          }
          transporter.sendMail(mailData, function (err, info) {
            if(err){
              console.log(err)
              res.status(200).json({success: false});
            }
              
            else{
              console.log(info)
              res.status(200).json({success: true});
            }
              
          })
          
      }else{
          console.log(err);
          res.status(403).send('Invalid Username or Password');
      }
      
    });
    // res.status(200).json({ email: email })
  }

  
}
