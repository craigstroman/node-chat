import angular from 'angular';
import SocketService from './socket/index';

const moduleName = 'appServices';

angular.module(moduleName, [])
     .factory('socketFactory', SocketService.socketFactory);

export default moduleName;
