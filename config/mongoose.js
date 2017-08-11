

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://prateek211205:sanu211205@ds058369.mlab.com:61262/todoapp');

module.exports = {
    mongoose
};
