
'use strict';
var ContainerModel = Backbone.Model.extend({
});

var UserModel = Backbone.Model.extend({
    
});


var UserCollection = Backbone.Collection.extend({
    model: UserModel
});

var ChatModel = Backbone.Model.extend({
    
});


var ChatCollection = Backbone.Collection.extend({
    model: ChatModel
});

var HomeModel = Backbone.Model.extend({
    defaults: {
        //Backbone collection for users
        onlineUsers: new UserCollection(),

        //Backbone collection for user chats, initialized with predefined chat model
        userChats: new ChatCollection([
            new ChatModel({sender: '', message: '<b>Chat Server v.</b>'})
        ])
    },

    // Method for adding new user to onlineUsers collection
    addUser: function(username) {
        this.get('onlineUsers').add(new UserModel({name: username}));
    },

    removeUser: function(username) {
        var onlineUsers = this.get('onlineUsers');
        var u = onlineUsers.find(function(item) {
            return item.get('name') == username;
        });

        if ( u ) {
            onlineUsers.remove(u);
        }
    },

    addChat: function(chat) {
        this.get('userChats').add(new ChatModel({sender: chat.sender, message: ' ' + chat.message}));
    },
});

var LoginModel = Backbone.Model.extend({
    defaults: {
    error: ""
    }
});