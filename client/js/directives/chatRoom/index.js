import chatRoom from '../../views/chat-room/room.html';

class ChatRoom {
  constructor($log) {
    this.$log = $log;

    this.restrict = 'E';
    this.template = chatRoom;
    this.replace = true;
    this.controller = 'ChatController';
    this.controllerAs = 'chat';
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["link"] }] */
  link(scope, elem, attrs) {
    const chatRoomText = elem[0].querySelector('.chat-room-text');
    const chatList = elem[0].querySelector('#chatList');

    scope.$watch(() => {
      if (chatList.scrollHeight > 0) {
        chatRoomText.scrollTop = chatRoomText.scrollHeight;
      }
    });
  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["link"] }] */

  static directiveFactory($log) {
    ChatRoom.instance = new ChatRoom($log);

    return ChatRoom.instance;
  }
}

ChatRoom.directiveFactory.$inject = ['$log'];

export default ChatRoom;
