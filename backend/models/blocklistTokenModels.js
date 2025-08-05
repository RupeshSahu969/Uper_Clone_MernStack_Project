const mongoose = require("mongoose");

const blocklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default:Date.now,
    expires:86400
    // TTL index, will expire at 'expiresAt'
  }
});

module.exports = mongoose.model("BlocklistToken",blocklistTokenSchema)

