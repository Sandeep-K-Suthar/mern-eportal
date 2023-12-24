const { mongoose, Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        id: { type: String, required: true, unique: true },
        subject: { type: String, required: true },
        role: { type: String, required: true },
        joined: { type: Date, default: Date.now },
        profile: { type: String, default: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" },
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;