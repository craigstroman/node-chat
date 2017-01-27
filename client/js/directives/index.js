import angular from 'angular';
import Login from './login/index';
import ChatRoom from './chatRoom/index';

const moduleName = 'appDirectives';

angular.module(moduleName, [])
  .directive('login', Login.directiveFactory)
  .directive('chatRoom', ChatRoom.directiveFactory);

export default moduleName;
