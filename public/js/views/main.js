var ContainerView = Backbone.View.extend({
    el: '#container',

    initialize: function(options) {
        this.model.on("change:viewState", this.render, this);
    },

    render: function() {
        var view = this.model.get('viewState');

        this.$el.html(view.render().el);
    }
});

var LoginView = Backbone.View.extend({
    className: 'app',

    template: _.template($('#login-template').html()),


    events: {
        'click #nameBtn': 'onLogin'
    },

    initialize: function(options) {
        this.vent = options.vent;

        this.listenTo(this.model, "change:error", this.render, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        if (!this.l) {
            this.l = Ladda.create(this.$("#nameBtn").get(0));
        } else {
            this.l.stop();
        }

        return this;
    },

    onLogin: function() {
        this.l.start();
        this.vent.trigger("login", this.$('#nameText').val());
    }
});


var HomeView = Backbone.View.extend({
    className: 'chat-room-container',

    template: _.template($("#home-template").html()),

    events: {
        'keypress #chatInput': 'chatInputPressed'
    },

    initialize: function(options) {

        console.log(options);
        this.vent = options.vent;

        var onlineUsers = this.model.get('onlineUsers');
        var userChats = this.model.get('userChats');
        
        this.listenTo(onlineUsers, "add", this.renderUser, this);
        this.listenTo(onlineUsers, "remove", this.renderUsers, this);
        this.listenTo(onlineUsers, "reset", this.renderUsers, this);

        this.listenTo(userChats, "add", this.renderChat, this);
        this.listenTo(userChats, "remove", this.renderChats, this);
        this.listenTo(userChats, "reset", this.renderChats, this);
    },

    render: function() {

        var onlineUsers = this.model.get("onlineUsers");
        
        this.$el.html(this.template());

        this.renderUsers();
        this.renderChats();
        
        return this;
    },

    renderUsers: function() {
        this.$('#userList').empty();

        this.model.get("onlineUsers").each(function (user) {
            this.renderUser(user);
        }, this);
    },


    renderUser: function(model) {
        var template = _.template("<a class='list-group-item'><%= name %></a>");

        this.$('#userList').append(template(model.toJSON()));

        this.$('#userCount').html(this.model.get("onlineUsers").length);
    },

    renderChats: function() {
        this.$('#chatList').empty();

        this.model.get('userChats').each(function(chat) {
            this.renderChat(chat);
        }, this);
    },

    renderChat: function(model) {
        var $chatRoomObj = $('.chat-room-text');
        var templateHtml = '';
        var template = {};

        if ( typeof model.attributes.sender === 'string' && model.attributes.sender.length === 0 ) {
            templateHtml = '<li class="team-member"><%= message %></li>'
        } else {
            templateHtml = '<li><div class="team-member"><%= sender %>:</div><%= message %></li>';
        }

        template = _.template(templateHtml);

        var element = $(template(model.toJSON()));
        
        element.appendTo(this.$('#chatList'));

        if ( $chatRoomObj.length ) {
            $chatRoomObj.scrollTop($chatRoomObj[0].scrollHeight);
        }
        
    },


    // events

    chatInputPressed: function(evt) {
        if (evt.keyCode == 13) {
            this.vent.trigger("chat", this.$('#chatInput').val());
            this.$('#chatInput').val('');

            return false;
        }
    }
});