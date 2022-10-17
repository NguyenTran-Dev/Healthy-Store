const mongoose = require('mongoose');
const mongoose_connect = (callback) => {
  mongoose.connect('mongodb+srv://adminnorustore:4iwOKnmRjuWTwIgj@norustore.37ekasg.mongodb.net/shop?retryWrites=true&w=majority').then((result) => {
    console.log('Connected mongooseDb!');
    callback(callback);
  }).catch((err) => {
    console.log(err);
  })
}

module.exports = mongoose_connect;
