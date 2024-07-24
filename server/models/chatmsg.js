const {Schema}= require('mongoose');
const {model}=require('mongoose');


const chats = new Schema({
    msg: {type:String,required: true},

    time:{type: String,required: true}
  }, { _id: false });
  



const chatmsgschema=new Schema({
    sender: {type: String,required: true,},
    
    receiver: {type: String,required: true,},

    chats: {type: [chats ],default: []}
    
    

})


const chatmsgmodel=model("chats",chatmsgschema);
module.exports=chatmsgmodel;