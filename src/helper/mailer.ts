import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { verify } from "crypto";

export const sendEmail = async ({email, emailType, userId}:any)=>{
    try {

        const hashedToken=await bcryptjs.hash(userId.toString(), 10)

        if (emailType==="Verify"){
          const updateUser= await User.findByIdAndUpdate(userId,{
            $set:{
              verifyToken: hashedToken,
              verifyTokenExpiry: new Date(Date.now()+3600000)
            }
          })
        }else if (emailType==="Reset"){
            await User.findByIdAndUpdate(userId,{$set:{resetToken: hashedToken, resetTokenExpiry:Date.now()+ 3600000}})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1549f8065af210",
              pass: "6b75d56a345932"
            }
          });

      const mailOption={
        from: 'gsam9080@gmail.com',
        to: email, // list of receivers
        subject: emailType==='Verify'? "Verify Your Email":"Reset Your Password", // Subject line
        html: `<p>Click <a herf="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="verify"?"Verify your email":"Reset your password"}<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
      }

      const mailResponse = await transport.sendMail(mailOption)
      return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
        
    }


}

