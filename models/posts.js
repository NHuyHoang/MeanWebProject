const mongoose = require('mongoose');
const commentSchema = require('./comments');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const postSchema = new Schema({
    userpost :{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title :{ type: String, required: true},
    date : Date,
    vipexpire : Date,
    available : { type: Boolean, default: false},
    approval :{ type: Boolean, default: false},
  	product:{},
  	comment:[commentSchema]
});

module.exports = mongoose.model('post', postSchema);