const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const Pusher = require('pusher')
const Pushers = async () => {
    const pusher = new Pusher({
        appId: '1070696',
        key: '1967848f74baa537fc2d',
        secret: '8c9d7ae6321e8b17756f',
        cluster: 'ap1',
        encrypted: true
    });

    try {
        const dbConnection = mongoose.connection
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        dbConnection.once('open',()=>{
            console.log("DB connected");

            const msgCollection = db.collection('Messages')
            const changeStream = msgCollection.watch()
            changeStream.on('change',(change)=>{
                console.log("Change occurred",change)

                if(change.operationType === 'insert'){
                    const messageDetails = change.fullDocument
                    pusher.trigger('messages','inserted',{
                        name: messageDetails.user,
                        message: messageDetails.message,
                        timestamp: messageDetails.timestamp,
                    })

                }
            })
        })
    } catch (err) {
        console.error(err.message);
        //Exit when process fails
        process.exit(1);
    }
};

module.exports = Pushers;