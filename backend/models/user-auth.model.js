const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", userSchema);

module.exports = {
    UserModel
}