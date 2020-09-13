const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessagesSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    messages:[
        {
            message:{
                type:String
            },
            date:{
                type: Date,
                default: Date.now
            },
            started:{
                type: Boolean,
                default:false
            },
            received:{
                type:Boolean,
                default: false
            },
            deleted:{
                type: Boolean,
                default:false
            },
            user:{
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    target:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    received:{
      type:Boolean,
      default: false
    }
})


module.exports = messagesContent = mongoose.model("messagesContent", MessagesSchema);