const {Schema}= require('mongoose');
const {model}=require('mongoose');



const chatappupschema=new Schema({
    username: {type: String,required: true,unique: true},
    
    useremail: {type: String,required: true,unique: true},
    
    hashedPassword: {type: String,required: true}

    

})


const chatappupmodel=model("chatappuser",chatappupschema);
module.exports=chatappupmodel;