const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const Messages = require("../../../../models/Messages")
const User = require("../../../../models/User")
router.post('/new',auth,async (req,res)=>{
    let {
        name,
        received,
        target,
    }= req.body

    const messageFields = {};
    messageFields.user = req.user.id;
    if (name)      messageFields.name = name;
    if (target)    messageFields.target = target;
    if (received)    messageFields.received = received;

    //Build fasilitas
    // messageFields.messages={};
    // if (message)   messageFields.messages.message = message;


    try{
        let newMessage = new Messages(messageFields);
        await newMessage.save();

        // res.status(201).send(`new message created: \n ${newMessage}`)
        res.status(201).json(newMessage);
    }catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})
router.post('/chats/:trkid',auth,async (req,res)=>{
    let {
        user,
        target,
        message
    }= req.body

    const messageFields = {};
    messageFields.messages={};
    if (message)   messageFields.messages.message = message;


    try{
        const Message = await Messages.findById({_id:req.params.trkid});
        if (JSON.stringify(Message.user) !== JSON.stringify(req.user.id) && JSON.stringify(Message.target) === JSON.stringify(req.user.id)){
            Message.messages.unshift({
                user:req.user.id,
                message:message
            });
            await Message.save();
            res.json(Message);
        }else if(JSON.stringify(Message.user) === JSON.stringify(req.user.id) && JSON.stringify(Message.target) !== JSON.stringify(req.user.id)){
            Message.messages.unshift({
                user:req.user.id,
                message:message
            });
            await Message.save();
            res.json(Message);
        }else{
            res.send(500).send('tidak bisa chat')
        }

        // if (Message.user  === req.user.id){
        //     if (Message.target !== req.user.id){
        //         console.log('bisa')
        //     }else{
        //         console.log('gabisa nge chat etdah')
        //     }
        // }else if(Message.target === req.user.id){
        //     if (Message.user !== req.user.id){
        //         console.log('Bisaaaa')
        //     }else{
        //         console.log('gabisa cuk')
        //     }
            // Message.messages.unshift({
            //     user:req.user.id,
            //     message:message
            // });
            // console.log(Message)
            // console.log('bisa')
        // }
        // }else if(Message.user === req.user.id){
        //     Message.messages.unshift({ message:message });
        //     console.log(Message)
        //     await Message.save();
        //     await res.json(Message);
        // }
        // }else if(Message.user === req.user.id){
        //     console.log(Message)
        //     Message.messages.unshift({ message:message });
        //     await Message.save();
        //     await res.json(Message);

        // }
    }catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

router.get('/sync',auth,async(req,res)=>{
    const user = await Messages.find({user:req.user.id});
    console.log(user)
    try{
        // const Message =await Messages.find()
        // res.json(Message)
        // if (!user) {
        //     return res.status(404).json({ msg: "Room not found" });
        // }

        await res.json(user);
    }catch (err) {
        console.error(err)
        res.status(500).send('error Message API')
    }
})

module.exports = router