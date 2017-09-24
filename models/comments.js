const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
const commentsSchema = new Schema({
  usercmt:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
  date: {type: Date,require: true},
  cmt: {type: String,require: true},
  reply:[]
  
});

module.exports = commentsSchema;