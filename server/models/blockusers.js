const {Schema}= require('mongoose');
const {model}=require('mongoose');


const blocklist = new Schema({
    friendname: {type:String,required: true}
  }, { _id: false });
  



const blockuserschema=new Schema({
    user: {type: String,required: true,},
    blocklist: {type: [blocklist ],default: []}
    
})


const blockusermodel=model("userblocklist",blockuserschema);
module.exports=blockusermodel;