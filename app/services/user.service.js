const Joi = require('joi');
const DbService = require("./db.service");
const UserModel = require("../model/user.model");

class UserService extends DbService{
    validateUser=(data)=>{
        try{
            let UserSchema  = Joi.object({
                name: Joi.string().min(3).max(12).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(20).required(),
                address: Joi.string(),
                role: Joi.string().required(),
                status: Joi.string().required(),
                image: Joi.string().empty()
            })
            
            let response = UserSchema.validate(data);
            if(response.error){
                throw response.error.details[0].message
            }   
        }catch(err){
            console.log(err);
            throw err;
        }
        
    }
    createUser = async (data)=>{
        try{
            return await this.db.collection('index').insertOne(data)
        } catch(excep){
            throw excep;
        }
    // }
    // getUserByEmail= async (data)=>{``
    //     try{
    //         let result = await this.db.collection("index").findOne({
    //             email: data.email,
    //             password: data.password
    //         });
    //         console.log(result)
    //     }catch(err){
    //         throw err;
    //     }
    }
    getUserByEmail = async (data) => {
        try{
            // SELECT * FROM users WHERE email = data.email AND password = data.password
            let result = await UserModel.findOne({
                email: data.email
            });
            return result;
            //console.log(result);
        } catch(err){
            throw err;
        }
    } 

}
module.exports = UserService;   