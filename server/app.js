const express=require('express');
const session = require ('express-session')
const app=express();

const port=3021;

const path=require('path');
const { mongoose }=require('mongoose');
const cors = require("cors");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const cookieParser=require("cookie-parser")

app.use(cookieParser())


app.use(session({
    secret: '1',
    resave: false,
    saveUninitialized: false
}))

app.use(
    cors({ 
      origin: "http://localhost:3000",
    })
  );




mongoose.connect(
    "mongodb://localhost:27017/CHATAPPREACT"
)

const database=mongoose.connection;
database.on("error",(error)=>
{
    console.log(error)
});
database.once("connected",()=>
{
    console.log("database connected");
})

const userdetails=require('/home/haritha/chatapp_react/server/models/schema.js')
const usersprofile=require('/home/haritha/chatapp_react/server/models/profile.js')
const userchats=require('/home/haritha/chatapp_react/server/models/chatmsg.js')


const verifyToken=require("./middleware/authMiddleware")




app.post('/signup',(async(req,res)=>
    {
        const {username, useremail, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);       
        const newuserr={username, useremail, hashedPassword}
        try{
            const exist=await userdetails.findOne({username:username});
            if(exist){
                console.log("exist")
                res.status(401).json({ message: "User already exists. Click login" });
            }
            const exist1=await userdetails.findOne({useremail:useremail});
            if(exist1){
                console.log("exist")
                res.status(402).json({ message: "User already exists. Click login" });
            }
            else{
                const user=await userdetails.create(newuserr)
                const token = jwt.sign(
                { userId: user._id, username: user.username },
                "your-secret-key",
                {
                    expiresIn: "1h",
                }
                );

                res.cookie("Authtoken", token);  
                res.json({
                status: true,
                message: "login success", 
                token,
                username: user.username
            });
            }
        }
        catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }))


    // //change profile



app.post('/login',async(req,res)=>
{
    const { username, password } = req.body;
    
    try{
        const user = await userdetails.findOne({ username: username });
        if (!user) {
            return res.status(401).send("Invalid username or password. Please signup first");
        }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res
        .status(402)
        .json({ error: "Authentication failed- password doesn't match" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your-secret-key",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("Authtoken", token);  

    res.json({
      status: true,
      message: "login success", 
      token,
      username: user.username
    });

  }
   catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }

    
    
})


app.post('/changeprofile',verifyToken, async(req,res)=>
    {
        const logeduser=req.username;
        
        try{
        
        const{setname,about}=req.body;
        const update={logeduser,setname,about}
        const exist=await usersprofile.findOne({logeduser:logeduser})
        const options = { new: true };
        if(exist){
            const updateddetails=await usersprofile.findOneAndUpdate({logeduser:logeduser},update,options);
            res.status(200).send("Profile CHANGED");
        }
        else{
            const data=await usersprofile.create(update)
            res.status(201).send("Profile Created");
    
        }}
        catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    })

app.get('/profile', verifyToken,async(req,res)=>{
        const logeduser=req.username;
        const exist=await usersprofile.findOne({logeduser:logeduser})
        res.json(exist)

}) 


app.get('/getprofile', verifyToken,async(req,res)=>{
        const logeduser=req.username;
        const exist=await usersprofile.findOne({logeduser:logeduser})
        res.json(exist)

}) 


// //function to display friend details in personal info page

app.get('/getpersonalinfo/:name',async(req,res)=>
{
    const usename=req.params.name;
    try{
        const db1data = await userdetails.findOne({ username: usename });
        const db2data = await usersprofile.findOne({ logeduser: usename });
        const email=db1data.useremail;
        const about=db2data.about;
        const data={usename,email,about};
        res.json(data);

    }
    catch(error){
        console.log("error in getpersonalinfo js")
    }
   
})



// //function to get all users to print on the chat div

app.get('/getfriends',verifyToken,async(req,res)=>
{
    const data=await usersprofile.find();
    const username =req.username;
    const dataandusername=[username,data]
    res.json(dataandusername);
})

//function to post a msg into db

app.post('/sendmsg/:name',verifyToken,async(req,res)=>
{
    try{

    let msgg=req.body;
    let msg=msgg.message;
    const sender =req.username;
    const receiver=req.params.name;
    const time = new Date().toISOString();
    const newmsg={sender,receiver,userchats:[]}
    const newrecmsg={receiver,sender,userchats:[]}

    let userchat=await userchats.findOne({sender:sender,receiver:receiver})
    if(!userchat){
        userchat=await userchats.create(newmsg)
    }
    userchat.chats.push({msg,time})
    await userchat.save();
    
    res.redirect(`/chat/${receiver}`)
    }
    catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ error: 'Failed to send message' });
}
})


// //function to display friend messages while loading page;

  app.get('/getfriendmsg/:name',verifyToken,async(req,res)=>
{
    const receiver=req.params.name;
    const sender =req.username;
    try{
        const senderuserchats = await userchats.findOne({ sender: sender, receiver: receiver });
        let sendermessages=[];
        if(senderuserchats){
        sendermessages=senderuserchats.chats
        }
        

        const receiveruserchats = await userchats.findOne({ sender: receiver, receiver: sender });
        let receivermessages=[]
        if(receiveruserchats){
        receivermessages=receiveruserchats.chats
        }
        
        const data=[sendermessages,receivermessages];
        res.json(data)

    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ error: 'Failed to send message' });
    }
}
)


//function to delete a user


app.delete('/delete',verifyToken,async(req,res)=>
    {
    try{
        const logeduser=req.username;
        const deleteuser=await userdetails.findOneAndDelete({username:logeduser})
        const deleteprofile=await usersprofile.findOneAndDelete({logeduser:logeduser})
        res.clearCookie("Authtoken");
        console.log("logout")
        res.status(200).send("Logout successful");
    }
        catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ error: 'Failed to send message' });
    }
    })



app.get("/logout", (req, res) => {

    res.clearCookie("Authtoken");
    res.status(200).send("Logout successful");
    console.log("logout")
    return res;
  });



app.listen(port,()=>
{
    console.log("server is running on port : "+port);
})