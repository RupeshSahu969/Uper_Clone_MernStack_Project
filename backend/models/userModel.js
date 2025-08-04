const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        select: false,  // To not include the password in the query results by default
    },
    socketId: {
        type: String,
    }
});

// Instance method: Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiration time for security
    return token;
};

// Instance method: Compare Password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static method: Hash Password
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Salt rounds
};

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};
