import io from 'socket.io-client';

class SocketService {
  /* eslint-disable prefer-rest-params */
  /* eslint-disable object-shorthand */
  /* eslint-disable prefer-arrow-callback */
  constructor($rootScope, $window, $log) {
    const host = `http://${$window.location.host}`;
    const socket = io.connect(host);
    return {
      // args: eventName, callback
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          const args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      // args: eventName, data, callback
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          const args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
    };
  }
  /* eslint-disable prefer-rest-params */
  /* eslint-disable object-shorthand */
  /* eslint-disable prefer-arrow-callback */

  static socketFactory($rootScope, $window, $log) {
    return new SocketService($rootScope, $window, $log);
  }
}

SocketService.socketFactory.$inject = ['$rootScope', '$window', '$log'];

export default SocketService;
