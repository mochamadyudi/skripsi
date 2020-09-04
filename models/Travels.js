const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const WisataSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    travelName: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    harga:{
        type:Number
    },
    address: {
        kecamatan: {
            type: String
        },
        kelurahan:{
            type: String
        },
        jalan: {
            type: String
        },
        desa: {
            type: String
        }
    },
    fasilitas: {
        parkir: {
            type: Boolean,
            default:false
        },
        warung:{
            type: Boolean,
            default:false
        },
        aula: {
            type: Boolean,
            default:false
        },
        wc: {
            type: Boolean,
            default:false
        },
        other:{
            type: String
        }
    },
    wishList: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Wisata = mongoose.model("wisata", WisataSchema);
