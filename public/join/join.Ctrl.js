(function () {
  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

  function JoinCtrl($location, $scope, $localStorage, socket) {
    $scope.name = '';
    let nickname;

    $scope.join = function () {
      nickname = $scope.name;
      $localStorage.nickname = nickname;

      socket.emit('join', {
        nickname,
      });

      $location.path('/main');
    };
  }
}());
