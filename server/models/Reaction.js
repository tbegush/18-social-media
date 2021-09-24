//defaults for mongoose and date formatting

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');

//this is where we set up the schema for the reaction

const reactionSchema = new Schema(
  {

    // Reaction (SCHEMA ONLY)    
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId


    reactionId: {
      type: Schema.Types.ObjectId,  //ObjectId
      required: true,
      default: new mongoose.Types.ObjectId()
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


const Reaction = model('Reaction', reactionSchema);
//this is where we export the schema
module.exports = {Reaction, reactionSchema};
