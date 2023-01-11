// const AddressSchemaDef = new mongoose.schema();
const mongoose = require("mongoose");

const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true // if compulsory
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    passowrd:{
        type: String,
        required: true
    },
    role:[{
        type: String,
        enum: ['admin','customer','seller'],
        default: "customer"
    }],
    status: { 
        type: String,
        enum: ['active','inactive'],
        default: "inactive"
    },
    address:{
            shipping: {
            state: {
                type: String
            },
            district:"",
            ward:"",
            location:""
        },
        billing: {
            shipping: {
                state: "",
                district:"",
                ward:"",
                location:""
        }
    }
}
})
const UserModel = mongoose.model("index", UserSchemaDef);
module.exports = UserModel;
