var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var User = new Schema({
    id: ObjectId
  , name: String
  , age: Number
  , gender: String
  , born_at: Date
});

mongoose.model('User', User);
