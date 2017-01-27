import loginView from '../../views/login/login.html';

class Login {
  constructor($log, $location) {
    this.$log = $log;
    this.$location = $location;

    this.restrict = 'AE';
    this.template = loginView;
    this.replace = true;
    this.controller = 'LoginController';
    this.controllerAs = 'login';
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["link"] }] */
  link(scope, elem, attrs) {

  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["link"] }] */

  static directiveFactory($log, $location) {
    Login.instance = new Login($log, $location);

    return Login.instance;
  }
}

Login.directiveFactory.$inject = ['$log', '$location'];

export default Login;
