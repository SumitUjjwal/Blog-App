const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
    bToken: String
})

const BlacklistModel = mongoose.model("btoken", blackListSchema);

module.exports = {
    BlacklistModel
}