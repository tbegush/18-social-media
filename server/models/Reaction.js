const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {

    // Reaction (SCHEMA ONLY)    
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId


    reactionId: {
      type: Int,   //should this be a string?
      required: true,
      default: new ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = reactionSchema;
