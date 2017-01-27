import angular from 'angular';
import LoginController from './login/login-controller';
import ChatController from './chat/chat-controller';

const moduleName = 'appControllers';

angular.module(moduleName, [])
  .controller('LoginController', LoginController)
  .controller('ChatController', ChatController);

export default moduleName;
