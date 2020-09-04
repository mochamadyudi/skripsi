const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const {Role} = require('./../../../../middleware/authRole');
const auth = require("./../../../../middleware/auth");
const Travels = require('./../../../../models/Travels')
const upload = require('./../../../../services/fileUpload').single('image');
const role ={
    admin: 'admin',
    villa: 'villa',
    customer: 'customer'
}


router.post("/upload", auth,Role(role.admin), (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    upload(req,res,async ()=>{
        const {
            travelName,
            harga,
            kecamatan,
            kelurahan,
            jalan,
            desa,
            parkir,
            warung,
            aula,
            wc,
            other
            } = req.body;
        const roomFields = {};
        roomFields.user = req.user.id;
        roomFields.fasilitas={};
        if (parkir)             roomFields.fasilitas.parkir = parkir;
        if (warung)             roomFields.fasilitas.warung = warung;
        if (aula)             roomFields.fasilitas.aula = aula;
        if (wc)        roomFields.fasilitas.wc = wc;
        if (other)          roomFields.fasilitas.other = other;

        roomFields.address={}
        if (kecamatan)             roomFields.address.kecamatan = kecamatan;
        if (kelurahan)             roomFields.address.kelurahan = kelurahan;
        if (jalan)             roomFields.address.jalan = jalan;
        if (desa)        roomFields.address.desa = desa;

        const newImage = ({
            url:req.file.location,
            name:req.file.key
        });
        const newTravel = new Travels({
            user: req.user.id,
            travelName:travelName,
            images:newImage,
            harga:harga,
            address:roomFields.address,
            fasilitas:roomFields.fasilitas
        });
        const travel = await newTravel.save();
        await res.json(travel);

    })
});

module.exports = router;
