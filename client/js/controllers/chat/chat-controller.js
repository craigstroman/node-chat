class ChatController {
  constructor($scope, socketFactory, $log, $window) {
    this.$scope = $scope;
    this.$log = $log;
    this.$window = $window;
    this.socketFactory = socketFactory;

    this.setListeners();
  }
  /* eslint-disable no-undef */
  setListeners() {
    const $scope = this.$scope;
    const socket = this.socketFactory;
    const $log = this.$log;
    const $window = this.$window;

    // Variables for users and messages being displayed to the user.
    $scope.users = [];
    $scope.messages = [];

    $scope.sendChat = () => {
      const chatText = $scope.chatText;

      if (angular.isString(chatText) && chatText.length >= 1) {
        socket.emit('sendchat', chatText);

        $scope.chatText = null;
      }
    };

    $scope.leaveRoom = () => {
      $window.location.assign('/');
    };

    // Sets users list to display online users.
    socket.on('updatechat:users', (data) => {
      $scope.users = data;
    });

    // Adds new user to users list.
    socket.on('updatechat:newUser', (data) => {
      $scope.users.push(data);
    });

    socket.on('updatechat:chatText', (username, createdDateTime, data) => {
      $scope.messages.push({
        user: username,
        created: createdDateTime,
        text: data,
      });
    });

    // Removes user from users list when the user disconnects.
    socket.on('updatechat:userLeft', (username) => {
      for (let i = 0; i < $scope.users.length; i += 1) {
        const user = $scope.users[i];
        if (user === username) {
          $scope.users.splice(i, 1);
        }
      }
    });
  }
}

ChatController.$inject = ['$scope', 'socketFactory', '$log', '$window'];

export default ChatController;
