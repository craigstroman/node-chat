const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uriString = process.env.MONGODB_URI ||
                            'mongodb://localhost/chatRoom'; 

mongoose.connect(uriString, (err, res) => {
    if ( err ) {
        console.log('ERROR connecting to:' + uriString + '.' + err);
    } else {
        console.log('Succeeded connected to: ' + uriString);
    }   
});

const chatSchema = new Schema({
    sender: String,
    msg: String,
    created: {type: Date, default: Date.now}   
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
    saveMsg: function(data, cb) {
        var newMsg = new Chat({msg: data.message, sender: data.sender, created: data.created});

        newMsg.save(function(err) {
            cb(err);
        });
    },
    getPreviousMsgs: function(limit, cb) {
        var query = Chat.find({});

        query.sort({created: 1}).limit(limit).exec(function(err, docs) {
            cb(err, docs);
        });
    }
};

