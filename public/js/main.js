'use strict';

$(document).ready(function() {
    
    var mainController = new MainController();

    mainController.init();
});

var MainController = function() {
    var self = this;

    // Event bus for the socket client.
    self.appEventBus = _.extend({}, Backbone.Events);

    // Event bus for Backbone Views
    self.viewEventBus = _.extend({}, Backbone.Events);

    self.init = function() {
        self.chatClient= new ChatClient({vent: self.appEventBus});
        self.chatClient.connect();

        self.loginModel = new LoginModel();
        self.containerModel = new ContainerModel({
            viewState: new LoginView({
                vent: self.viewEventBus,
                model: self.loginModel                
            })
        });

        self.containerView = new ContainerView({model: self.containerModel});
        self.containerView.render();
    };

    // View event bus message handlers 
    self.viewEventBus.on('login', function(name) {
        // Socetio login
        self.chatClient.login(name);
    });

    // Socket client event bus message handlers
    self.viewEventBus.on("chat", function(chat) {
        // socketio chat
        self.chatClient.chat(chat);
    });

    // Triggered when login success
    self.appEventBus.on('loginDone', function() {
        self.homeModel = new HomeModel();
        self.homeView = new HomeView({vent: self.viewEventBus, model: self.homeModel});

        // Set viewstate to homeview
        self.containerModel.set('viewState', self.homeView);
    });

    self.appEventBus.on('loginNameBad', function(name) {
        self.loginModel.set('error', 'Name already exists.');
    });

    self.appEventBus.on('loginNameExists', function(name) {
        self.loginModel.set('error', 'Name already exists.');
    });

    // triggered when client requests users info
    // responds with an array of online users.    
    self.appEventBus.on('usersInfo', function(data) {
        var onlineUsers = self.homeModel.get('onlineUsers');
        var users = _.map(data, function(item) {
            return new UserModel({name: item});
        });

        onlineUsers.reset(users);
    });

    // Triggered when a client joins the server.
    self.appEventBus.on('userJoined', function(username) {
        self.homeModel.addUser(username);
    });

    // Triggered when a client leaves the server.
    self.appEventBus.on('userLeft', function(username) {
        self.homeModel.removeUser(username);
    });           

    // Triggered when chat receieved
    self.appEventBus.on('chatReceived', function(chat) {
        self.homeModel.addChat(chat);
    });
}