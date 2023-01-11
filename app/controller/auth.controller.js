const UserService = require("../services/user.service");
const nodemailer = require('nodemailer');
const { SMTP } = require('../../config/config');
const {MongoClient} = require('mongodb');

class AuthController{
 constructor(){
    this.user_svc = new UserService();
 }
    registerUser = async (req, res, next)=>{
        try{
            let body = req.body;
    //user service
        if(req.file){
            body.image = req.file.filename
        }
        this.user_svc.validateUser(body);
        console.log(body)
        let data = await this.user_svc.createUser(body);

    //nodemailer
        // let transporter = nodemailer.createTransport({
        //     host: SMTP.HOST,
        //     port: SMTP.PORT,
        //     secure: SMTP.TLS,
        //     auth:{
        //         user: SMTP.USER,
        //         pass: SMTP.PASS
        //     }
        // });
        // let mail_response = await transporter.sendMail({
        //     to: body.email,
        //     from: SMTP.FROM,
        //     subject: "Account Registered",
        //     text: "Dear,"+body.name+"Your account has been registered",
        //     html: `<b>Dear${body.name}, <b/><br><b> Your account has been registered! </b>`
        // })
        res.json({
            result: data,
            status: true,
            msg: "Register data test"
        })
        }catch(excep){
            console.log(excep)
            next({status:400, msg: excep})
            
        }
    }
    loginUser = async (req, res, next)=>{
        try{
            let data = req.body;
            let loggedInUser = await this.user_svc.getUserByEmail(data);

        }catch(excepts){
            console.log('Login: ', excepts)
            next({status: 400, msg: JSON.stringify(excepts)});
        } 
 //status code is always 200.00k port is always success 
    }
    logoutUser = (req, res, next)=>{
        //if i am a logged in user, respond my data 
        // if iam not logged in user, request to login
                    //login check
            next();    //throw exception ==> next({})
        res.status(401).json({
            result: null,
            status: false,
            msg: "user not logged in"
        })
    }
}
//   [
    // let validation_flag = true ;
    // if(!validation_flag){
    //     next({status: 400,
    //             msg: "Credentials doesn't match"
    //         })
    //     // res.status(400).json({
    //     //     result: null, // <any data-types>
    //     //     status: false, //<boolean only>
    //     //     msg: "Credentials doesnot match" // <string only>
    //     // });
    // }else{
    //     res.json({
    //         result: body,
    //         status: true ,
    //         msg: "Log in sucess"
    //     })
    // }
// ]
module.exports= AuthController;