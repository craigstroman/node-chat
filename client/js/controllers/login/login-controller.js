class LoginController {
  constructor($scope, socketFactory, $log, $document, $location) {
    this.$scope = $scope;
    this.$log = $log;
    this.$document = $document;
    this.socketFactory = socketFactory;
    this.$location = $location;

    this.setListeners();
  }
  /* eslint-disable no-undef */
  setListeners() {
    const $scope = this.$scope;
    const socket = this.socketFactory;
    const $log = this.$log;
    const $location = this.$location;
    $scope.loginForm = {};
    $scope.login = {};

    $scope.login = () => {
      const username = $scope.username;
      // Send username to server.
      socket.emit('user:join', {
        user: username,
      });

      // Login not successfull, show error message.
      socket.on('loginError', (data) => {
        $scope.loginForm.username.$invalid = true;
        $scope.errorMessage = 'Username already exists.';
      });

      // Login successfull, show chat room.
      socket.on('userConnected', (data) => {
        $location.path('/room');
      });
    };
  }
}

LoginController.$inject = ['$scope', 'socketFactory', '$log', '$document', '$location'];

export default LoginController;
