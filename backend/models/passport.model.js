const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema({
    passport_id : String,
    passport_name : String,
    passport_age : Number
})

const passportModel = mongoose.model("passport", passportSchema);

module.exports = {
    passportModel
}